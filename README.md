# 🎮 Node.js API - Fantasia Planner

API RESTful desenvolvida em **Node.js + TypeScript**, projetada para gerenciar **usuários, missões (quests), conquistas (achievements)** e ranking gamificado.
Ideal para sistemas de planejamento pessoal com mecânicas de **gamificação**.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Execução](#-instalação-e-execução)
- [Endpoints](#-endpoints)
- [Exemplo de Fluxo](#-exemplo-de-fluxo)
- [Testes](#-testes)
- [Contribuição](#-contribuição)

---

## 🧩 Visão Geral

O **Fantasia Planner API** tem como objetivo transformar o gerenciamento de tarefas em uma **experiência gamificada**, permitindo que usuários:

- ✅ Criem e gerenciem **usuários**
- ✅ Adicionem, atualizem e removam **missões (quests)**
- ✅ Conquistem **achievements** ao concluir tarefas
- ✅ Competem em um **ranking global de XP**

Os dados são armazenados em **JSON local** (filesystem), simulando um banco de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express.js** (v5)
- **CORS** para segurança e integração
- **File System (fs/promises)** para persistência
- **Postman** para testes de endpoints

---

## 📂 Estrutura do Projeto

```bash
src/
 ├── controller/              # Controladores HTTP
 ├── models/                  # Modelos de dados (User, Quest, Achievement)
 ├── repositories/            # Acesso ao "banco" JSON
 ├── routes/                  # Definição das rotas
 ├── services/                # Regras de negócio
 │   ├── services-user/       # Operações relacionadas a usuários
 │   ├── services-quest/      # Operações relacionadas a quests
 │   ├── services-achievements# Operações relacionadas a conquistas
 │   └── service-ranking.ts   # Ranking global
 ├── util/                    # Funções utilitárias (datas, corpo de req, etc.)
 ├── server.ts                # Inicialização do servidor
 └── app.ts                   # Configuração do Express
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js (>= 18)
- npm ou yarn

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/samu-benjamim/nodejs-API-Fantasia-Planner.git

# Acesse a pasta
cd nodejs-API-Fantasia-Planner

# Instale as dependências
npm install

# Ambiente de desenvolvimento
npm run start:dev

# Ambiente de build e produção
npm run start:dist
```

Por padrão, a API roda na porta definida no `.env`:

```
PORT=3333
```

---

## 🔗 Endpoints

### 👤 Usuários

- **GET /game-system/users** → Listar todos os usuários
- **GET /game-system/users/\:id** → Ver detalhes de um usuário
- **POST /game-system/users** → Criar novo usuário
- **PATCH /game-system/users/\:id** → Atualizar usuário
- **DELETE /game-system/users/\:id** → Deletar usuário

### 🗡️ Quests

- **GET /game-system/users/\:id/quests** → Listar quests de um usuário
- **POST /game-system/users/\:id/quests** → Criar nova quest
- **PATCH /game-system/users/\:id/quests/\:id2** → Atualizar quest
- **DELETE /game-system/users/\:id/quests/\:id2** → Remover quest

### 🏆 Conquistas

- **GET /game-system/users/\:id/achievents** → Listar conquistas de um usuário

### 📊 Ranking

- **GET /game-system/ranking** → Ranking de usuários por XP

---

## 🔄 Exemplo de Fluxo

1. **Criar usuário**

```json
POST /game-system/users
{
  "name": "Alex",
  "email": "alex@email.com",
  "passwordHash": "123456",
  "level": 1,
  "xp": 0,
  "quests": [],
  "achievements": []
}
```

2. **Adicionar Quest**

```json
POST /game-system/users/1/quests
{
  "title": "Estudar Node.js",
  "description": "Dedicar 1h de estudo em Node.js",
  "status": "Em andamento",
  "xpReward": 50,
  "deadline": "5"
}
```

3. **Concluir Quest**

```json
PATCH /game-system/users/1/quests/1
{
  "status": "Concluido"
}
```

➡️ Usuário ganha **XP** e desbloqueia um **Achievement**.

---

## 🧪 Testes

Todos os endpoints foram **validados com Postman** ✅.

---

## 📄 Licença

Este projeto está sob a licença **MIT**.
