'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Est-ce que la plateforme est gratuite ?',
    answer: 'Oui ! L\'accès à toutes les formations, labs et certifications est entièrement gratuit. Notre mission est de rendre le DevOps accessible à tous les francophones sans barrière financière.',
  },
  {
    question: 'Quel niveau est requis pour commencer ?',
    answer: 'Aucun prérequis n\'est nécessaire. Notre parcours commence par les fondamentaux (Linux, réseaux, scripting) et progresse jusqu\'au niveau expert. Que vous soyez débutant ou confirmé, vous trouverez du contenu adapté à votre niveau.',
  },
  {
    question: 'Les formations préparent-elles aux certifications officielles ?',
    answer: 'Absolument ! Nos cours sur Red Hat (RHCSA, RHCE), AWS, Kubernetes (CKA, CKAD), Terraform et HashiCorp sont alignés avec les programmes officiels de certification. De nombreux apprenants ont réussi leurs certifs grâce à nos labs.',
  },
  {
    question: 'Combien de temps faut-il pour devenir DevOps ?',
    answer: 'Le parcours complet peut se faire en 6 à 12 mois selon votre rythme et votre expérience préalable. Nous recommandons 1 à 2 heures par jour de pratique régulière. Le système de streaks vous aide à maintenir la constance.',
  },
  {
    question: 'Les labs sont-ils vraiment pratiques ?',
    answer: 'Oui, chaque lab propose des exercices concrets avec des instructions pas à pas, des commandes à exécuter, et des schémas explicatifs. Vous travaillez sur des scénarios réels d\'entreprise : déploiement de microservices, mise en place de pipelines CI/CD, configuration de monitoring...',
  },
  {
    question: 'Puis-je suivre les cours sur mobile ?',
    answer: 'La plateforme est entièrement responsive et fonctionne sur tous les appareils. Vous pouvez lire les cours et consulter les fiches récapitulatives sur mobile. Pour les labs pratiques, nous recommandons un ordinateur pour plus de confort.',
  },
  {
    question: 'Comment fonctionne le système de XP et de niveaux ?',
    answer: 'Chaque leçon complétée, lab terminé ou quiz réussi vous rapporte des points d\'expérience (XP). Vous montez de niveau au fur et à mesure et débloquez des badges. Le streak tracker récompense votre régularité quotidienne. C\'est un système de gamification pour maintenir votre motivation !',
  },
  {
    question: 'Le contenu est-il mis à jour régulièrement ?',
    answer: 'Oui, nous mettons à jour le contenu en continu pour suivre l\'évolution rapide de l\'écosystème DevOps. Les nouvelles versions de Kubernetes, Terraform, Docker et autres outils sont intégrées dès leur sortie.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-badge">
            <HelpCircle size={16} className="text-secondary-400" />
            FAQ
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold dark:text-white">
            Questions{' '}
            <span className="gradient-text">Fréquentes</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur DevOps Expert Academy.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`card !p-0 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'border-primary-500/30 shadow-lg shadow-primary-500/5' : ''
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="font-semibold dark:text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} className={`transition-colors ${openIndex === index ? 'text-primary-400' : 'text-gray-400'}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="card p-8 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 border-primary-500/20">
            <MessageCircle size={32} className="mx-auto text-primary-400 mb-4" />
            <h3 className="font-bold dark:text-white text-lg mb-2">Encore des questions ?</h3>
            <p className="text-gray-500 text-sm mb-4">
              Notre communauté et notre chatbot sont là pour vous aider.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/community" className="btn-primary text-sm !px-5 !py-2">
                Rejoindre la communauté
              </a>
              <a href="/about" className="btn-outline text-sm !px-5 !py-2">
                En savoir plus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
