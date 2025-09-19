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

POST /users → Criar novo usuário OK

GET /users/:id → Buscar perfil OK

PATCH /users/:id → Atualizar usuário OK

DELETE /users/:id → Deletar usuário OK

🔹 Quests

POST /users/:id/quests → Criar missão OK

GET /users/:id/quests → Listar missões OK

PATCH /users/:id/quests/:questId → Atualizar missão

DELETE /users/:id/quests/:questId → Remover missão

🔹 Achievements

POST /users/:id/achievements → Adicionar conquista OK

GET /users/:id/achievements → Listar conquistas OK

🔹 Progressão

PATCH /users/:id/progress/xp → Adicionar XP / calcular nível

GET /ranking → Ranking de usuários
Perfeito, Alex — vou te passar um **plano prático e código pronto** para integrar **MongoDB (com Mongoose)** ao seu projeto TypeScript/Express, com passo-a-passo, alterações mínimas no projeto, estratégia para permitir **JSON local ou Mongo** (switch por variável de ambiente) e um script de migração para importar os dados JSON atuais para o Mongo.

Vou dividir em: 1) dependências e instalação; 2) estrutura/arquivos novos; 3) conexão com Mongo; 4) modelos (schemas) em Mongoose; 5) adaptar services (exemplo prático para `listUser` e `createUser`); 6) estratégia de fallback (JSON ↔ Mongo); 7) script de migração; 8) dicas de segurança / produção.

---

## 1) Instalação

Na raiz do projeto:

```bash
# instala mongoose e dotenv
npm install mongoose dotenv

# em TypeScript, normalmente não precisa @types/mongoose pois as tipos vêm com o pacote,
# mas se preferir (opcional):
# npm install -D @types/mongoose
```

Crie um `.env` (ou atualize) com a URI do Mongo:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/fantasia-planner
DB_PROVIDER=json   # 'json' ou 'mongo' (controle a escolha do provedor)
```

> `DB_PROVIDER` permite alternar entre `json` (comportamento atual) e `mongo` (novo).

---

## 2) Arquivos novos sugeridos

Sugestão de arquivos a criar em `src`:

```
src/
 ├─ db/
 │   └─ index.ts            # conexão com mongoose + switch provider
 ├─ models/
 │   └─ mongoose/           # schemas mongoose
 │       ├─ user.schema.ts
 │       ├─ quest.schema.ts
 │       └─ achievement.schema.ts
 ├─ repositories/
 │   └─ mongo/              # repositórios que usam mongoose
 │       └─ user-repo.ts
 ├─ scripts/
 │   └─ migrate-json-to-mongo.ts
```

---

## 3) Conexão com Mongo (db/index.ts)

`src/db/index.ts` — conecta ao Mongo e exporta helper para verificar provider:

```ts
// src/db/index.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
const DB_PROVIDER = (process.env.DB_PROVIDER || "json").toLowerCase();

export const connectMongo = async () => {
  if (DB_PROVIDER !== "mongo") return;

  try {
    await mongoose.connect(MONGO_URI, {
      // opções modernas do mongoose podem ser passadas aqui se necessário
    });
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
    throw err;
  }
};

export const isMongoProvider = () => DB_PROVIDER === "mongo";
```

No `server.ts`, importe e chame `connectMongo()` antes de `app.listen()`:

```ts
// src/server.ts (exemplo)
import createApp from "./app";
import { connectMongo } from "./db";

const app = createApp();
const port = process.env.PORT || 3000;

(async () => {
  await connectMongo();
  app.listen(port, () => console.log(`Servidor na porta ${port}`));
})();
```

---

## 4) Schemas Mongoose (exemplos)

### `src/models/mongoose/quest.schema.ts`

```ts
import { Schema } from "mongoose";

export const QuestSchema = new Schema(
  {
    id: { type: Number, required: true }, // manter id numérico local para compatibilidade
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: { type: String, default: "Em andamento" },
    xpReward: { type: Number, default: 0 },
    deadline: { type: String, default: "" }, // você mantém como string formatada
  },
  { _id: false } // evitar ObjectId duplicado para subdocs
);
```

### `src/models/mongoose/achievement.schema.ts`

```ts
import { Schema } from "mongoose";

export const AchievementSchema = new Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String },
    unlockedAt: { type: String },
  },
  { _id: false }
);
```

### `src/models/mongoose/user.schema.ts`

```ts
import { Schema, model } from "mongoose";
import { QuestSchema } from "./quest.schema";
import { AchievementSchema } from "./achievement.schema";

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true }, // id sequencial mantido
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  level: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  quests: { type: [QuestSchema], default: [] },
  achievements: { type: [AchievementSchema], default: [] },
  createdAt: { type: String },
  updatedAt: { type: String },
});

export const UserModel = model("User", UserSchema);
```

> Observação: aqui mantemos `id` numérico para compatibilidade com seu código atual (que usa `id` como number). Alternativamente, você poderia usar `_id` do Mongo e adaptar o código.

---

## 5) Repositório Mongo — exemplo `user-repo.ts`

Crie repositório para operações diretas no banco (abstrai Mongoose do service):

```ts
// src/repositories/mongo/user-repo.ts
import { UserModel } from "../../models/mongoose/user.schema";
import { UserModel as IUser } from "../../models/user-model"; // sua interface TS

export const findAllUsers = async () => {
  return await UserModel.find().sort({ id: 1 }).lean();
};

export const findUserById = async (id: number) => {
  return await UserModel.findOne({ id }).lean();
};

export const createUser = async (user: Partial<IUser>) => {
  const created = await UserModel.create(user);
  return created.toObject();
};

export const updateUserById = async (id: number, payload: Partial<IUser>) => {
  const updated = await UserModel.findOneAndUpdate({ id }, payload, {
    new: true,
  }).lean();
  return updated;
};

export const deleteUserById = async (id: number) => {
  const res = await UserModel.deleteOne({ id });
  return res.deletedCount;
};

// operações de quests podem ser implementadas aqui (push, pull em subdocumentos)
```

---

## 6) Adaptar services — exemplo `serviceListUser` e `serviceCreateUser`

Você já tem services que utilizam `repositoryUser()` (JSON). Vamos mostrar uma versão que decide dinamicamente qual repositório usar (JSON ou Mongo).

### `src/services/services-user/list-user.ts` (adaptado)

```ts
import { FilterModel } from "../../models/filter-model";
import { UserModel } from "../../models/user-model";
import { repositoryUser } from "../../repositories/planner-gamified-repositories"; // JSON repo
import { isMongoProvider } from "../../db";
import * as mongoUserRepo from "../../repositories/mongo/user-repo";

export const serviceListUser = async (): Promise<FilterModel<UserModel>> => {
  if (isMongoProvider()) {
    const data = await mongoUserRepo.findAllUsers();
    return { statusCode: 200, body: data as UserModel[] };
  }

  const data = await repositoryUser(); // comportamento atual
  return {
    statusCode: 200,
    body: data,
  };
};
```

### `src/services/services-user/creat-user.ts` (adaptado)

```ts
import { FilterModel } from "../../models/filter-model";
import { UserModel } from "../../models/user-model";
import { repositoryUser } from "../../repositories/planner-gamified-repositories";
import { isMongoProvider } from "../../db";
import * as mongoUserRepo from "../../repositories/mongo/user-repo";
import registrationDate from "../../util/registration-date";
import calculationDeadline from "../../util/calculation-deadline";
import { QuestModel } from "../../models/quest-model";

export const serviceCreateUser = async (
  newUser: UserModel
): Promise<FilterModel<UserModel>> => {
  if (isMongoProvider()) {
    // gerar newId automaticamente (ou calcular com último id)
    const existing = await mongoUserRepo.findAllUsers();
    const newId =
      existing.length > 0 ? Math.max(...existing.map((u) => u.id)) + 1 : 1;

    const deadlineQuestInital = await calculationDeadline(5);
    const questInital: QuestModel = {
      id: 1,
      title: "confirmação",
      description: "confirmação no e-mail",
      status: "Em andamento",
      xpReward: 10,
      deadline: deadlineQuestInital,
    };

    newUser.id = newId;
    newUser.quests = newUser.quests || [];
    newUser.quests.push(questInital);
    newUser.createdAt = await registrationDate();
    newUser.updatedAt = await registrationDate();

    const created = await mongoUserRepo.createUser(newUser);
    const all = await mongoUserRepo.findAllUsers();
    return { statusCode: 201, body: all as UserModel[] };
  }

  // fallback JSON (seu código atual)
  const usersResponse = await serviceListUser();
  const users = usersResponse.body;

  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const deadlineQuestInital = await calculationDeadline(5);

  const questInital: QuestModel = {
    id: 1,
    title: "confirmação",
    description: "confirmação no e-mail",
    status: "Em andamento",
    xpReward: 10,
    deadline: deadlineQuestInital,
  };

  newUser.id = newId;
  newUser.quests.push(questInital);
  newUser.createdAt = await registrationDate();
  newUser.updatedAt = await registrationDate();

  users.push(newUser);
  await fs.writeFile(pathUser, JSON.stringify(users, null, 2), "utf-8");

  return {
    statusCode: 201,
    body: users,
  };
};
```

> A ideia é **fazer o mínimo de mudança** nos controllers e services — as controllers continuam chamando `serviceCreateUser()` etc.; apenas os serviços detectam o provider.

---

## 7) Migração: script para importar JSON atual para Mongo

`src/scripts/migrate-json-to-mongo.ts` — script de linha de comando que lê seu `planner-gamified.json` e insere no Mongo:

```ts
// src/scripts/migrate-json-to-mongo.ts
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserModel } from "../models/mongoose/user.schema";

dotenv.config();

const pathUser = path.join(__dirname, "../repositories/planner-gamified.json");

async function main() {
  const uri = process.env.MONGO_URI!;
  await mongoose.connect(uri);
  console.log("Conectado para migração");

  const raw = await fs.readFile(pathUser, "utf-8");
  const users = JSON.parse(raw);

  if (!Array.isArray(users)) {
    console.error("Arquivo JSON inválido");
    process.exit(1);
  }

  // opcional: limpar coleção antes
  await UserModel.deleteMany({});
  await UserModel.insertMany(users);
  console.log("Migração concluída:", users.length, "usuários inseridos");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Execute com `ts-node`/`tsx`:

```bash
# instale tsx se já não tiver (você já tem no projeto)
npx tsx src/scripts/migrate-json-to-mongo.ts
```

---

## 8) Boas práticas / pontos importantes

- **Senha**: nunca armazene `passwordHash` em texto puro. Use `bcrypt` (ou `argon2`) para hash.
  `npm install bcrypt` e ao criar usuário: `const hash = await bcrypt.hash(plainPassword, 10)`.

- **Índices**: adicione índice único em `email` e (se mantiver) `id`.
  No schema: `email: { type: String, unique: true }`.

- **Transações**: se você for fazer várias operações críticas (ex.: remover quest e atualizar xp/achievements), use transações do Mongo (sessions) para garantir atomicidade.

- **Validação**: use `zod`/`joi`/`class-validator` nas rotas ou services para validar o body da requisição.

- **Paginação**: para `listUsers`/`ranking` em produção, implemente paginação (`limit`, `skip`) em vez de retornar tudo.

- **Migrations e Seeds**: considere usar scripts de seed e ferramentas (ex.: `migrate-mongo`) para gerenciar alterações no esquema/dados.

- **Conexão**: não crie nova conexão em cada requisição — faça uma conexão única ao iniciar o servidor (como no `connectMongo()`).

- **Fallback**: se quiser manter JSON como fallback, garanta que `DB_PROVIDER=json` seja a opção padrão. Evite escrever nos dois ao mesmo tempo — escolha um provider por execução.

---

## 9) Checklist para integrar agora (passo a passo rápido)

1. Instalar `mongoose` e `dotenv`.
2. Criar `src/db/index.ts` e chamar `connectMongo()` em `server.ts`.
3. Criar schemas Mongoose (`user`, `quest`, `achievement`).
4. Implementar repositório `src/repositories/mongo/user-repo.ts`.
5. Atualizar services para checar `isMongoProvider()` e usar repositório Mongo quando habilitado.
6. Testar local: rodar Mongo local (Docker ou MongoDB Compass), ajustar `MONGO_URI` no `.env`.
7. Rodar o script de migração para popular dados existentes.
8. Testar todos os endpoints no Postman com `DB_PROVIDER=mongo`.

---

## 10) Exemplo rápido de `docker-compose` (opcional)

Se quiser rodar o Mongo localmente rápido:

```yaml
# docker-compose.yml
version: "3.8"
services:
  mongo:
    image: mongo:6
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

Rode `docker-compose up -d` e use `MONGO_URI=mongodb://localhost:27017/fantasia-planner`.

---

Se quiser, eu já **faço** (Gatilho: você me autoriza) — posso gerar os arquivos prontos (conexão, schemas, repositório e exemplo de service adaptado) para você colar no projeto. Quer que eu gere esses arquivos agora?
