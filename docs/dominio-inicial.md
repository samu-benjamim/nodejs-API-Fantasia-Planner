# 📜 Documento de Definição — **API Fantasia Planner**

## 🎯 Objetivo

A **Fantasia Planner API** é uma aplicação gamificada de organização de tempo e metas.
Cada usuário pode criar missões (quests), acompanhar progresso, ganhar XP, subir de nível e desbloquear conquistas.

---

## 🗄️ Banco de Dados — Estrutura (MongoDB)

### Coleção: `users`

```json
{
  "_id": "ObjectId",
  "name": "Samuel",
  "email": "samuel@email.com",
  "passwordHash": "hashSeguraAqui",
  "level": 3,
  "xp": 250,
  "energy": 80,
  "quests": [
    {
      "id": "UUID",
      "title": "Estudar Node.js",
      "description": "Dedicar 1h ao estudo de APIs",
      "status": "in_progress",
      "xpReward": 30,
      "deadline": "2025-09-10T20:00:00Z"
    }
  ],
  "achievements": [
    {
      "id": "UUID",
      "title": "Primeira Missão",
      "description": "Concluiu a primeira missão com sucesso!",
      "unlocked_at": "2025-09-04T19:00:00Z"
    }
  ],
  "createdAt": "2025-09-04T18:00:00Z",
  "updatedAt": "2025-09-04T19:30:00Z"
}
```

---

## 🔑 Entidades Principais

1. **Usuário**

   - `name`, `email`, `passwordHash`, `level`, `xp`, `energy`
   - Contém **quests** e **achievements**

2. **Quest (Missão)**

   - `title`, `description`, `status`, `xpReward`, `deadline`

3. **Achievement (Conquista)**

   - `title`, `description`, `unlocked_at`

---

## 🌐 Endpoints Planejados

### 🔹 Usuários

- **POST `/users`** → Criar novo usuário
- **GET `/users/:id`** → Buscar perfil
- **PATCH `/users/:id`** → Atualizar usuário
- **DELETE `/users/:id`** → Deletar usuário

### 🔹 Quests

- **POST `/users/:id/quests`** → Criar missão
- **GET `/users/:id/quests`** → Listar missões
- **PATCH `/users/:id/quests/:questId`** → Atualizar missão
- **DELETE `/users/:id/quests/:questId`** → Remover missão

### 🔹 Achievements

- **POST `/users/:id/achievements`** → Adicionar conquista
- **GET `/users/:id/achievements`** → Listar conquistas

### 🔹 Progressão

- **PATCH `/users/:id/progress/xp`** → Adicionar XP / calcular nível
- **GET `/ranking`** → Ranking de usuários

---

## ⚔️ Regras de Negócio

1. Missão concluída **adiciona XP** ao usuário.
2. **Nível sobe automaticamente** quando XP ultrapassa limite.
3. Conquistas são desbloqueadas por **eventos**.
4. **Energy** limita quantidade de esforço diário.

---

## 🛠️ Tecnologias

- [Node.js](https://nodejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) (autenticação)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (hash de senhas)

---

## 📂 Estrutura de Pastas (Sugestão)

```
fantasia-planner-api/
│── src/
│   ├── config/
│   │   └── database.ts          # Conexão com MongoDB
│   │
│   ├── models/
│   │   ├── User.ts              # Schema e model do usuário
│   │   ├── Quest.ts             # Subdocumento ou model de Quest
│   │   └── Achievement.ts       # Subdocumento ou model de Achievement
│   │
│   ├── controllers/
│   │   ├── user-controller.ts   # CRUD de usuários
│   │   ├── quest-controller.ts  # Operações de missões
│   │   └── achievement-controller.ts # Operações de conquistas
│   │
│   ├── services/
│   │   ├── user-service.ts
│   │   ├── quest-service.ts
│   │   └── achievement-service.ts
│   │
│   ├── routes/
│   │   ├── user-routes.ts
│   │   ├── quest-routes.ts
│   │   └── achievement-routes.ts
│   │
│   ├── middlewares/
│   │   ├── auth-middleware.ts   # JWT e autenticação
│   │   └── error-middleware.ts  # Tratamento de erros
│   │
│   ├── utils/
│   │   └── helpers.ts           # Funções auxiliares
│   │
│   ├── server.ts                # Inicialização da API
│   └── app.ts                   # Configuração principal do Express
│
├── .env                         # Variáveis de ambiente (PORT, DB_URI, JWT_SECRET)
├── package.json
├── tsconfig.json
└── README.md
```

---

⚡ Essa organização deixa o projeto **escalável, limpo e fácil de manter**.

Quer que eu te monte já o **modelo User.ts (Mongoose)** com `quests` e `achievements` como subdocumentos, para ver como ficaria no banco?

🔹 Usuários

POST /users → Criar novo usuário

GET /users/:id → Buscar perfil

PATCH /users/:id → Atualizar usuário

DELETE /users/:id → Deletar usuário

🔹 Quests

POST /users/:id/quests → Criar missão

GET /users/:id/quests → Listar missões

PATCH /users/:id/quests/:questId → Atualizar missão

DELETE /users/:id/quests/:questId → Remover missão

🔹 Achievements

POST /users/:id/achievements → Adicionar conquista

GET /users/:id/achievements → Listar conquistas

🔹 Progressão

PATCH /users/:id/progress/xp → Adicionar XP / calcular nível

GET /ranking → Ranking de usuários
