![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-v5-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge)
![Status](https://img.shields.io/badge/status-concluído-brightgreen?style=for-the-badge)

# 🎮 Fantasia Planner API

API RESTful desenvolvida em **Node.js + TypeScript** para gerenciar **usuários, missões (quests) e conquistas (achievements)** com mecânicas de **gamificação** e **ranking global de XP**.

> Desenvolvida para praticar arquitetura em camadas (Controller → Service → Repository), regras de negócio encapsuladas em serviços e validação de endpoints REST com Postman.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura-em-camadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Endpoints](#-endpoints)
- [Fluxo de Gamificação](#-fluxo-de-gamificação)
- [O que foi praticado](#-o-que-foi-praticado)
- [Licença](#-licença)

---

## 💡 Sobre o Projeto

O **Fantasia Planner** transforma o gerenciamento de tarefas em uma **experiência gamificada**. Cada missão concluída concede XP ao usuário, que pode desbloquear conquistas e subir no ranking global.

**Funcionalidades:**
- 👤 Criação e gerenciamento de usuários
- 🗡️ Missões com título, descrição, recompensa em XP e prazo
- 🏆 Conquistas desbloqueadas automaticamente ao concluir quests
- 📊 Ranking global de usuários ordenado por XP

Os dados são persistidos em **arquivos JSON** via `fs/promises`, simulando um repositório de dados sem necessidade de banco externo.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| Node.js 18+ | Runtime JavaScript |
| TypeScript 5 | Tipagem estática e segurança em tempo de desenvolvimento |
| Express v5 | Framework HTTP |
| fs/promises | Persistência de dados em JSON local |
| CORS | Segurança e integração com front-end |
| Postman | Testes manuais de endpoints |

---

## 🏗️ Arquitetura em Camadas

```
Request → Controller → Service → Repository → JSON (filesystem)
```

| Camada | Responsabilidade |
|---|---|
| **Controller** | Recebe a requisição HTTP e retorna a resposta |
| **Service** | Contém as regras de negócio (XP, achievements, validações) |
| **Repository** | Lê e escreve os dados no arquivo JSON |

---

## 📂 Estrutura do Projeto

```bash
src/
 ├── controller/               # Controladores HTTP
 ├── models/                   # Modelos de dados (User, Quest, Achievement)
 ├── repositories/             # Acesso ao "banco" JSON
 ├── routes/                   # Definição das rotas
 ├── services/                 # Regras de negócio
 │   ├── services-user/        # Operações relacionadas a usuários
 │   ├── services-quest/       # Operações relacionadas a quests
 │   ├── services-achievements/# Lógica de desbloqueio de conquistas
 │   └── service-ranking.ts    # Ranking global por XP
 ├── util/                     # Funções utilitárias (datas, parsing, etc.)
 ├── server.ts                 # Inicialização do servidor
 └── app.ts                    # Configuração do Express
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos

- Node.js >= 18
- npm ou yarn

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/samu-benjamim/nodejs-API-Fantasia-Planner.git
cd nodejs-API-Fantasia-Planner

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie em modo desenvolvimento
npm run start:dev

# Build e produção
npm run start:dist
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3333
```

---

## 🔗 Endpoints

Base URL: `http://localhost:3333`

### 👤 Usuários

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/game-system/users` | Listar todos os usuários |
| `GET` | `/game-system/users/:id` | Buscar usuário por ID |
| `POST` | `/game-system/users` | Criar novo usuário |
| `PATCH` | `/game-system/users/:id` | Atualizar usuário |
| `DELETE` | `/game-system/users/:id` | Deletar usuário |

**POST `/game-system/users` — Body:**
```json
{
  "name": "Alex",
  "email": "alex@email.com",
  "passwordHash": "123456"
}
```

**Resposta `201 Created`:**
```json
{
  "id": "uuid-gerado",
  "name": "Alex",
  "email": "alex@email.com",
  "level": 1,
  "xp": 0,
  "quests": [],
  "achievements": []
}
```

---

### 🗡️ Quests

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/game-system/users/:id/quests` | Listar quests do usuário |
| `POST` | `/game-system/users/:id/quests` | Criar nova quest |
| `PATCH` | `/game-system/users/:id/quests/:questId` | Atualizar quest |
| `DELETE` | `/game-system/users/:id/quests/:questId` | Remover quest |

**POST — Body:**
```json
{
  "title": "Estudar Node.js",
  "description": "Dedicar 1h de estudo em Node.js",
  "status": "Em andamento",
  "xpReward": 50,
  "deadline": "5"
}
```

**Concluir Quest — PATCH Body:**
```json
{
  "status": "Concluido"
}
```

**Resposta `200 OK`** *(usuário recebe XP e pode desbloquear achievement):*
```json
{
  "message": "Quest concluída! +50 XP",
  "user": {
    "id": "uuid",
    "xp": 50,
    "achievements": ["Primeira Quest Concluída"]
  }
}
```

---

### 🏆 Conquistas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/game-system/users/:id/achievements` | Listar conquistas do usuário |

**Resposta `200 OK`:**
```json
[
  {
    "id": "ach-01",
    "title": "Primeira Quest Concluída",
    "description": "Você completou sua primeira missão!",
    "unlockedAt": "2025-04-01T10:30:00.000Z"
  }
]
```

---

### 📊 Ranking

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/game-system/ranking` | Ranking de usuários por XP |

**Resposta `200 OK`:**
```json
[
  { "position": 1, "name": "Alex", "xp": 350, "level": 4 },
  { "position": 2, "name": "Maria", "xp": 200, "level": 3 }
]
```

---

## 🔄 Fluxo de Gamificação

```
[Criar Usuário] → [Criar Quest] → [Concluir Quest]
                                         │
                               ┌─────────▼─────────┐
                               │  Service calcula   │
                               │  XP + nível        │
                               └─────────┬─────────┘
                                         │
                               ┌─────────▼─────────┐
                               │ Verifica e desbloqueia│
                               │    Achievements    │
                               └─────────┬─────────┘
                                         │
                               ┌─────────▼─────────┐
                               │  Ranking atualizado│
                               └───────────────────┘
```

---

## 🎯 O que foi praticado

- Arquitetura em camadas com separação clara de responsabilidades
- Tipagem estática com TypeScript em toda a aplicação
- Persistência de dados sem banco externo usando `fs/promises`
- Encapsulamento de regras de negócio na camada de serviços
- Testes manuais e exploratórios de endpoints com Postman
- Validação de fluxos de erro (usuário inexistente, quest já concluída, etc.)
- Lógica de gamificação: cálculo de XP, nível e desbloqueio de achievements

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

🔗 **Repositório:** [github.com/samu-benjamim/nodejs-API-Fantasia-Planner](https://github.com/samu-benjamim/nodejs-API-Fantasia-Planner)
