# 🏆 Planner Gamificado - API

Uma **API RESTful** desenvolvida em **Node.js + TypeScript**, que funciona como um **planner gamificado**: os usuários podem criar contas, adicionar quests (missões), ganhar XP, subir de nível e desbloquear conquistas.

Ideal para estudar **back-end nativo com TypeScript**, sem uso de frameworks pesados como Express.

---

## 🚀 Funcionalidades

- 👤 **Usuários**

  - Criar, listar, atualizar e deletar usuários.
  - Cada usuário tem nível, XP, quests e achievements.

- 🎯 **Quests (Missões)**

  - Criar novas quests associadas a um usuário.
  - Atualizar, listar e deletar quests.
  - Completar missões concede XP e achievements.

- 🏅 **Achievements (Conquistas)**

  - Desbloqueados ao concluir quests.
  - Visualização individual por usuário.

- 📊 **Ranking**
  - Ranking global de usuários, ordenado por XP.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js (HTTP nativo)**
- **TypeScript**
- **fs/promises** para persistência em JSON
- **Regex** para roteamento
- **Arquitetura em camadas**: `controllers`, `services`, `repositories`, `models`

---

## 📂 Estrutura de Pastas

```bash
├── src
│   ├── controller/       # Lógica entre rotas e serviços
│   ├── models/           # Definição dos modelos (User, Quest, Achievement)
│   ├── repositories/     # Persistência em arquivos JSON
│   ├── routes/           # Definição de rotas e padrões de URL
│   ├── services/         # Regras de negócio
│   ├── util/             # Utilitários (ex: HttpMethods, helpers)
│   └── app.ts            # Entrada da aplicação
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

## ⚡ Instalação e Uso

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/samu-benjamim/nodejs-API-Fantasia-Planner.git
cd planner-gamificado
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Execute o servidor

```bash
npm run dev
```

O servidor iniciará em:

```
http://localhost:3000
```

---

## 📌 Exemplos de Endpoints

### 👤 Usuários

- **Criar usuário**
  `POST /users`

- **Listar todos usuários**
  `GET /users`

- **Ver usuário por ID**
  `GET /user/1`

- **Atualizar usuário**
  `PATCH /user/1`

- **Deletar usuário**
  `DELETE /user/1`

---

### 🎯 Quests

- **Criar quest para um usuário**
  `POST /user/1/quests`

- **Listar quests do usuário**
  `GET /user/1/quests`

- **Atualizar quest**
  `PATCH /user/1/quests/2`

- **Deletar quest**
  `DELETE /user/1/quests/2`

---

### 🏅 Achievements

- **Listar conquistas do usuário**
  `GET /user/1/achievements`

---

### 📊 Ranking

- **Ver ranking global**
  `GET /ranking`

---

## 📖 Aprendizados com o Projeto

Este projeto foi desenvolvido para praticar:

- Estruturação de uma **API RESTful** sem frameworks.
- Manipulação de arquivos JSON com **fs/promises**.
- Aplicação de **Regex para roteamento**.
- Uso avançado de **TypeScript** (interfaces, tipagem forte e DTOs).
- Implementação de **arquitetura em camadas**.

---

## 📜 Licença

Este projeto é open-source sob a licença MIT.
Sinta-se à vontade para usar, modificar e compartilhar.

---

### ✨ Autor

Desenvolvido por **[Samuel Mendes](https://github.com/samu-benjamim)** 🚀
