const express = require('express');
const { getDb } = require('../db/connection');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/quizzes - List quizzes
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const db = getDb();

    let sql = 'SELECT id, title, slug, description, category, difficulty, pass_score, time_limit_minutes, xp_reward, question_count, attempt_count FROM quizzes';
    const args = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      args.push(category);
    }
    if (difficulty) {
      conditions.push('difficulty = ?');
      args.push(difficulty);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC';

    const result = await db.execute({ sql, args });

    res.json({ quizzes: result.rows });
  } catch (error) {
    console.error('List quizzes error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des quizzes' });
  }
});

// GET /api/quizzes/:slug - Get quiz with questions
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const db = getDb();
    const { slug } = req.params;

    const quizResult = await db.execute({
      sql: 'SELECT * FROM quizzes WHERE slug = ?',
      args: [slug]
    });

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz non trouvé' });
    }

    const quiz = quizResult.rows[0];

    // Get questions (without correct_answer for non-submitted view)
    const questionsResult = await db.execute({
      sql: 'SELECT id, question, question_type, options, order_index FROM quiz_questions WHERE quiz_id = ? ORDER BY order_index',
      args: [quiz.id]
    });

    // Get best attempt if authenticated
    let bestAttempt = null;
    if (req.user) {
      const attemptResult = await db.execute({
        sql: 'SELECT * FROM quiz_attempts WHERE user_id = ? AND quiz_id = ? ORDER BY score DESC LIMIT 1',
        args: [req.user.id, quiz.id]
      });
      if (attemptResult.rows.length > 0) {
        bestAttempt = attemptResult.rows[0];
      }
    }

    res.json({
      quiz: {
        ...quiz,
        questions: questionsResult.rows,
        bestAttempt
      }
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du quiz' });
  }
});

// POST /api/quizzes/:id/submit - Submit quiz answers
router.post('/:id/submit', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const quizId = parseInt(req.params.id);
    const { answers, time_taken } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Réponses requises' });
    }

    // Get quiz
    const quizResult = await db.execute({
      sql: 'SELECT * FROM quizzes WHERE id = ?',
      args: [quizId]
    });

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz non trouvé' });
    }

    const quiz = quizResult.rows[0];

    // Get questions with correct answers
    const questionsResult = await db.execute({
      sql: 'SELECT id, correct_answer, explanation FROM quiz_questions WHERE quiz_id = ? ORDER BY order_index',
      args: [quizId]
    });

    const questions = questionsResult.rows;

    // Score the quiz
    let correctCount = 0;
    const results = [];

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = answers[i] || null;
      const isCorrect = userAnswer === question.correct_answer;
      if (isCorrect) correctCount++;

      results.push({
        question_id: question.id,
        user_answer: userAnswer,
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        explanation: question.explanation
      });
    }

    const score = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
    const passed = score >= quiz.pass_score;

    // Save attempt
    await db.execute({
      sql: 'INSERT INTO quiz_attempts (user_id, quiz_id, score, passed, answers, time_taken) VALUES (?, ?, ?, ?, ?, ?)',
      args: [req.user.id, quizId, score, passed ? 1 : 0, JSON.stringify(answers), time_taken || null]
    });

    // Update quiz attempt count
    await db.execute({
      sql: 'UPDATE quizzes SET attempt_count = attempt_count + 1 WHERE id = ?',
      args: [quizId]
    });

    // Award XP if passed
    let xpEarned = 0;
    if (passed) {
      xpEarned = quiz.xp_reward;
      await db.execute({
        sql: 'UPDATE users SET xp_points = xp_points + ? WHERE id = ?',
        args: [xpEarned, req.user.id]
      });
    }

    res.json({
      message: passed ? 'Quiz réussi ! Félicitations !' : 'Quiz terminé. Continuez à vous entraîner !',
      score: Math.round(score * 100) / 100,
      passed,
      correct_count: correctCount,
      total_questions: questions.length,
      xp_earned: xpEarned,
      results
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Erreur lors de la soumission du quiz' });
  }
});

module.exports = router;
