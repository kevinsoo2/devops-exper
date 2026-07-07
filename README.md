# 🚀 DevOps Expert Academy

Plateforme complète pour devenir expert DevOps. Full-stack application avec:

- **Frontend**: Next.js 14 + Tailwind CSS → déployé sur **Vercel**
- **Backend**: Express.js API → déployé sur **Render**
- **Database**: SQLite edge via **Turso** (libSQL)

---

## 📁 Architecture

```
devops-expert/
├── frontend/          → Next.js (Vercel)
│   ├── src/app/       → Pages (App Router)
│   ├── src/components → Composants React
│   ├── src/lib/       → API client + Store
│   └── vercel.json    → Config Vercel
├── backend/           → Express API (Render)
│   ├── src/routes/    → 8 routes API
│   ├── src/db/        → Turso connection + migrations
│   ├── src/middleware/ → Auth JWT
│   └── render.yaml    → Config Render (Blueprint)
└── render.yaml        → Render Blueprint (racine)
```

---

## 🛠️ Déploiement

### 1. Turso (Base de données)

```bash
# Installer le CLI Turso
curl -sSfL https://get.tur.so/install.sh | bash

# Se connecter
turso auth login

# Créer la base de données
turso db create devops-expert --location cdg

# Obtenir l'URL et le token
turso db show devops-expert --url
turso db tokens create devops-expert
```

### 2. Render (Backend API)

1. Connectez votre repo GitHub à [Render](https://render.com)
2. Créez un **New Web Service**
3. Sélectionnez le dossier `backend/` comme root directory
4. Ajoutez les variables d'environnement :
   - `TURSO_DATABASE_URL` → URL de votre base Turso
   - `TURSO_AUTH_TOKEN` → Token Turso
   - `JWT_SECRET` → Clé secrète (auto-générée)
   - `FRONTEND_URL` → URL de votre app Vercel
   - `NODE_ENV` → `production`

**Ou utilisez le Blueprint** : importez `render.yaml` depuis la racine.

### 3. Vercel (Frontend)

1. Connectez votre repo à [Vercel](https://vercel.com)
2. Sélectionnez le dossier `frontend/` comme root directory
3. Framework preset: **Next.js**
4. Ajoutez la variable d'environnement :
   - `NEXT_PUBLIC_API_URL` → URL de votre service Render (ex: `https://devops-expert-api.onrender.com`)

---

## 💻 Développement local

### Backend
```bash
cd backend
cp .env.example .env
# Éditez .env avec vos credentials Turso (ou utilisez file:local.db)
npm install
npm run db:migrate
npm run db:seed
npm run dev
# → http://localhost:3001
```

### Frontend
```bash
cd frontend
cp .env.example .env.local
# Éditez avec NEXT_PUBLIC_API_URL=http://localhost:3001
npm install
npm run dev
# → http://localhost:3000
```

---

## 📡 API Endpoints

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/api/auth/register` | Inscription | ❌ |
| POST | `/api/auth/login` | Connexion | ❌ |
| GET | `/api/auth/me` | Profil utilisateur | ✅ |
| GET | `/api/courses` | Liste des cours | ❌ |
| GET | `/api/courses/:slug` | Détail d'un cours | ❌ |
| POST | `/api/courses/:slug/enroll` | S'inscrire à un cours | ✅ |
| GET | `/api/labs` | Liste des labs | ❌ |
| POST | `/api/labs/:slug/start` | Démarrer un lab | ✅ |
| POST | `/api/labs/:slug/complete` | Compléter un lab | ✅ |
| GET | `/api/tools` | Liste des outils | ❌ |
| GET | `/api/certifications` | Liste certifications | ❌ |
| POST | `/api/certifications/:slug/start` | Démarrer une prépa | ✅ |
| GET | `/api/blog` | Liste des articles | ❌ |
| POST | `/api/blog/subscribe` | Newsletter | ❌ |
| GET | `/api/stats` | Statistiques publiques | ❌ |
| GET | `/api/stats/roadmap` | Roadmap items | ❌ |
| GET | `/api/progress` | Progression utilisateur | ✅ |
| PUT | `/api/progress/lesson/:id` | Compléter une leçon | ✅ |

---

## 🗄️ Base de données (Turso)

14 tables: `users`, `courses`, `chapters`, `lessons`, `enrollments`, `lesson_progress`, `labs`, `lab_completions`, `tools`, `certifications`, `cert_progress`, `posts`, `subscribers`, `roadmap_items`

---

## 🔒 Sécurité

- JWT pour l'authentification
- Bcrypt pour le hashing des mots de passe
- Rate limiting (100 req/15min)
- Helmet pour les headers de sécurité
- CORS configuré
- Validation Zod sur les inputs
- Parameterized queries (pas d'injection SQL)

---

## 📦 Technologies

| Couche | Stack |
|--------|-------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand, Lucide Icons |
| Backend | Express.js, @libsql/client, JWT, Bcrypt, Zod, Helmet |
| Database | Turso (libSQL / SQLite edge) |
| Hosting | Vercel (frontend) + Render (backend) |
| CI/CD | Auto-deploy on git push |
