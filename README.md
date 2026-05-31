<div align="center">

<img src="/public/assets/images/logo/logo-readme.png">

# Fye Finance Tracker (MVP)

**Fuel Your Economy** — Sistema web de gestão financeira pessoal
<br>
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

##### [Sobre](#-sobre) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Arquitetura](#-arquitetura) • [Instalação](#-instalação) • [Uso](#-uso) • [API](#-api) • [Estrutura](#-estrutura-do-projeto) • [Próximos Passos](#-próximos-passos)

</div>

---

## 📖 Sobre

O **Fye Finance Tracker** é uma aplicação web do tipo finance tracker desenvolvida como projeto semestral individual na [São Paulo Tech School](https://www.sptech.school/), no curso de Ciência da Computação.

O projeto nasceu de uma dor real: a falta de uma ferramenta prática e visualmente clara para o controle financeiro pessoal. Mais do que um exercício acadêmico, o Fye é um MVP (Minimum Viable Product) funcional que visa contribuir com a educação financeira — tema urgente no Brasil, onde mais de 81 milhões de pessoas estão inadimplentes e apenas 39% da população sente ter real controle sobre suas finanças (Serasa Experian / Creditas, 2025–2026).

> Projeto desenvolvido por [Daniel Bueno](https://danbueno.com).

---

## ✨ Funcionalidades

### 🏠 Landing Page
- Apresentação do projeto com seções Hero, Problema e Solução
- Preview visual da dashboard em mockup de navegador
- Navegação para cadastro e login

<img src="/public/assets/images/hero-print.png">

### 🔐 Autenticação
- Cadastro de usuário com validação de campos em tempo real
- Indicador visual de força da senha
- Login com email e senha (hash SHA-256)
- Sessão gerenciada via `sessionStorage`

<img src="/public/assets/images/register-print.png">

### 📊 Dashboard (Visão Geral)
- Saudação personalizada com base no horário do dia
- **5 KPIs dinâmicos** filtráveis por mês:
  - **Receita** — total recebido no mês
  - **Gastos** — total gasto no mês
  - **Investido** — total investido no mês
  - **Saldo** — receita menos gastos e investimentos
  - **Saúde Financeira** — score calculado por fórmula personalizada
- **4 gráficos interativos** (Chart.js):
  - Fontes de renda (rosca por categoria)
  - Gastos por categoria (rosca)
  - Investimentos por categoria (rosca)
  - Movimentação diária (heatmap de calendário mensal)
- Navegação mensal com setas de controle

<img src="/public/assets/images/dashboard-print.png">

### 💳 Transações
- Cadastro de receitas, despesas e investimentos
- Edição inline de todos os campos diretamente na lista
- Exclusão de transações
- Marcação como **recorrente** (replicação automática nos meses seguintes)
- **Ordenação** por: data, categoria, valor ou nome
- **Filtro** por tipo: todos, renda, gasto ou investimento
- Ordem ascendente ou descendente

<img src="/public/assets/images/transactions-print.png">

### 🏷️ Categorias
- Criação, edição e exclusão de categorias personalizadas
- Tipos: Renda, Gasto ou Investimento
- Gerenciadas via modal dedicado na página de Transações

<img src="/public/assets/images/categories-print.png">

### 🤖 Chatbot com IA (Gemini)
- Cadastro de transações por **linguagem natural**
- O usuário descreve a transação em texto livre
- A IA (Gemini 2.5 Flash) interpreta e extrai: nome, valor, data, categoria e descrição
- A transação é criada automaticamente após confirmação

<img src="/public/assets/images/chatbot-print.png">

---

## 🛠 Tecnologias

| Camada | Tecnologia | Descrição |
|---|---|---|
| **Frontend** | HTML5, CSS3, JavaScript | Interface web vanilla, sem frameworks |
| **Ícones** | [Phosphor Icons](https://phosphoricons.com/) | Biblioteca de ícones |
| **Gráficos** | [Chart.js](https://www.chartjs.org/) | Visualizações interativas |
| **Fontes** | Google Fonts (Inter, JetBrains Mono, Noto Serif Display) | Tipografia |
| **Backend** | [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) | Servidor web e API REST |
| **Banco de Dados** | [MySQL](https://www.mysql.com/) | Persistência de dados |
| **IA** | [Google Gemini 2.5 Flash](https://ai.google.dev/) via `@google/genai` | Chatbot de linguagem natural |
| **Virtualização** | [VirtualBox](https://www.virtualbox.org/) + Lubuntu | Servidor de banco isolado |
| **Versionamento** | [Git](https://git-scm.com/) + [GitHub](https://github.com/) | Controle de versão |

### Dependências Node.js

```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.17.1",
  "mysql2": "^3.9.4",
  "nodemon": "^2.0.7",
  "@google/genai": "^0.14.1"
}
```

---

## 🏗 Arquitetura

O projeto segue uma arquitetura cliente-servidor com dois servidores distintos:

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENTE                             │
│              Navegador (Chrome, Firefox, Edge...)           │
│                    via internet (HTTP)                      │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVIDOR 2                            │
│                    Servidor Web (Node.js)                   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  HTML/CSS/JS │  │  Express.js  │  │   API Gemini     │   │
│  │   (public/)  │  │  (REST API)  │  │  (Chatbot IA)    │   │
│  └──────────────┘  └──────┬───────┘  └──────────────────┘   │
│                           │ JSON endpoints                  │
└───────────────────────────┼─────────────────────────────────┘
                            │ via internet (MySQL)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       SERVIDOR 1                            │
│              Banco de Dados (VirtualBox + Lubuntu)          │
│                                                             │
│         MySQL Server — porta 3306 (VM) → 3307 (host)        │
└─────────────────────────────────────────────────────────────┘
```

### Padrão de Arquitetura do Backend

O backend segue o padrão **MVC** (Model-View-Controller):

```
src/
├── controllers/   ← Lógica de negócio e validação de inputs
├── models/        ← Queries SQL e acesso ao banco de dados
├── routes/        ← Definição dos endpoints HTTP
└── database/      ← Configuração da conexão MySQL
```

---

## 🗄 Banco de Dados

### Schema

```sql
fintrack
├── user             (id, user_name, email, passwd, timestamps)
├── item_type        (id, item_type)   → INCOME | EXPENSE | INVESTMENT
├── item_category    (id, user_id, category, item_type_id, timestamps)
└── item             (id, user_id, item_name, item_category_id,
                      item_description, is_recurring, parent_item,
                      amount, event_date, timestamps)
```

### Diagrama de Relacionamentos

```
user ──< item_category >── item_type
user ──< item >── item_category
item ──< item (auto-referência: parent_item para recorrências)
```

### Senhas

As senhas são armazenadas com hash **SHA-256** diretamente via MySQL:
```sql
passwd = sha2('senha_do_usuario', 256)
```

---

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) (local ou via VirtualBox)
- [Git](https://git-scm.com/)
- Chave de API do [Google Gemini](https://aistudio.google.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/danielsrbueno/fye-finance-tracker.git
cd fye-finance-tracker
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Execute o schema SQL no seu servidor MySQL:

```bash
mysql -u root -p < src/database/schema.sql
```

Isso irá criar o banco `fintrack` com todas as tabelas, os tipos de item e um usuário de demonstração com dados mockados para os meses de abril, maio e junho de 2026.

> **Usuário de demo criado:**
> - Email: `daniel@danbueno.com`
> - Senha: `hash123`

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env.dev` na raiz do projeto (para desenvolvimento):

```env
# Ambiente
ENVIRONMENT=dev

# Banco de Dados
DB_HOST=localhost
DB_DATABASE=fintrack
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_PORT=3306

# Servidor
APP_PORT=3000
APP_HOST=localhost

# IA
GEMINI_API_KEY=sua_chave_gemini_aqui
```

> Para produção, crie um arquivo `.env` com `ENVIRONMENT=prod`.

> **Nota sobre o Gemini:** A versão gratuita da API possui limite de tokens. Para uso intenso, considere um plano pago.

### 5. Inicie a aplicação

**Desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

### 6. Acesse no navegador

```
http://localhost:3000
```

---

## 🚀 Uso

### Fluxo principal

1. **Acesse a landing page** em `/` e clique em "Crie sua conta"
2. **Cadastre-se** com nome, email e senha
3. **Faça login** com suas credenciais
4. Na tela de **Transações**, crie categorias (ex: Salário → Renda; Mercado → Gasto; Ações → Investimento)
5. Registre suas transações preenchendo o formulário ou usando o **Chatbot**
6. Acesse a **Visão Geral** para ver seus KPIs e gráficos

### Usando o Chatbot

No menu lateral, clique em **Chatbot** e descreva sua transação em linguagem natural:

```
"Gastei 45 reais no iFood ontem"
"Recebi meu salário de 3500 hoje"
"Aportei 200 reais em Bitcoin dia 20"
```

> O chatbot identificará automaticamente os campos e criará a transação. Certifique-se de ter as **categorias criadas previamente**, pois o bot só associa a categorias existentes.

### Transações Recorrentes

Na página de Transações, clique nos três pontos de uma transação e selecione "Marcar como recorrente". Nos meses seguintes, ao acessar o dashboard, a transação será replicada automaticamente na mesma data.

---

## 🔌 API

Base URL: `http://localhost:{APP_PORT}`

### Usuários

| Método | Endpoint | Descrição | Body |
|---|---|---|---|
| `POST` | `/user/register` | Cadastra novo usuário | `{ userName, userEmail, userPassword }` |
| `POST` | `/user/login` | Autentica usuário | `{ userEmail, userPassword }` |

### Transações

| Método | Endpoint | Descrição | Params / Body |
|---|---|---|---|
| `GET` | `/transaction/:userId` | Dados do dashboard (KPIs + gráficos) | Query: `month`, `year` |
| `GET` | `/transaction/all/:userId` | Lista todas as transações do mês | Query: `month`, `year` |
| `POST` | `/transaction/create` | Cria nova transação | `{ userId, transactionName, transactionAmount, transactionDate, transactionCategoryId, transactionDescription }` |
| `PUT` | `/transaction/update` | Atualiza transação existente | `{ userId, transactionId, transactionName, transactionAmount, transactionDate, transactionCategoryId, transactionDescription, transactionIsRecurring }` |
| `DELETE` | `/transaction/remove` | Remove transação (soft delete) | `{ userId, transactionId }` |

### Categorias

| Método | Endpoint | Descrição | Body |
|---|---|---|---|
| `GET` | `/category/all/:userId` | Lista categorias do usuário | — |
| `POST` | `/category/create` | Cria nova categoria | `{ userId, categoryName, categoryType }` |
| `PUT` | `/category/update` | Atualiza categoria | `{ userId, categoryId, categoryName, categoryType }` |
| `DELETE` | `/category/remove` | Remove categoria (soft delete) | `{ userId, categoryId }` |

### Chatbot

| Método | Endpoint | Descrição | Body |
|---|---|---|---|
| `POST` | `/chat-bot/send-message` | Envia mensagem para a IA | `{ message }` |

#### Exemplo de resposta do chatbot

```json
{
  "itemName": "iFood",
  "amount": 45.00,
  "eventDate": "2026-05-29",
  "category": 5,
  "description": "Lanche noite",
  "response": "Transação registrada com sucesso! Adicionei um gasto de R$45,00 no iFood."
}
```

---

## 📁 Estrutura do Projeto

```
fye-finance-tracker/
│
├── app.js                          # Entry point — configura Express e rotas
├── package.json
├── .env.example                    # Modelo de variáveis de ambiente
├── .gitignore
├── LICENSE
│
├── src/
│   ├── controllers/
│   │   ├── category.controller.js
│   │   ├── chatbot.controller.js
│   │   ├── transaction.controller.js
│   │   └── user.controller.js
│   │
│   ├── models/
│   │   ├── category.model.js
│   │   ├── chatbot.model.js        # Integração com Google Gemini
│   │   ├── transaction.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── category.route.js
│   │   ├── chatbot.route.js
│   │   ├── index.route.js
│   │   ├── transaction.route.js
│   │   └── user.route.js
│   │
│   └── database/
│       ├── config.js               # Conexão MySQL
│       └── schema.sql              # Schema + dados mockados
│
├── public/                         # Frontend estático servido pelo Express
│   ├── index.html                  # Landing page
│   ├── style.css                   # Estilos globais (landing)
│   │
│   ├── assets/
│   │   └── images/                 # Logos, screenshots, imagens
│   │
│   ├── login/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   │
│   ├── register/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
│   │
│   └── app/
│       ├── index.html              # Dashboard principal
│       ├── script.js               # Lógica do dashboard + Chart.js
│       ├── style.css
│       ├── not-found.html          # Tela de mês sem transações
│       │
│       ├── transactions/
│       │   ├── index.html
│       │   ├── script.js
│       │   └── style.css
│       │
│       └── chat-bot/
│           ├── index.html
│           ├── script.js
│           └── style.css
│
└── docs/
    └── fye-documentation.pdf       # Documentação acadêmica completa
```

---

## 🎨 Design System

O projeto utiliza um design system consistente baseado em variáveis CSS customizadas:

| Token | Valor | Uso |
|---|---|---|
| `--color-taupe-950` | `#0c0a09` | Background principal |
| `--color-taupe-900` | `#1d1816` | Sidebar, cards |
| `--color-orange-500` | `#f97316` | Acentos, CTAs |
| `--color-orange-600` | `#ea580c` | Acentos ativos |
| `--color-emerald-500` | `#10b981` | Indicadores de receita |
| `--color-red-500` | `#ef4444` | Erros, saldo negativo |
| `--font-inter-sans` | Inter | Texto geral |
| `--font-jetbrains-mono` | JetBrains Mono | Valores, labels, código |
| `--font-noto-serif` | Noto Serif Display | Títulos e headings |

---

## 📐 Fórmula de Saúde Financeira

O índice de saúde financeira é calculado pela seguinte fórmula:

```
Saúde Financeira = (Investido / Receita) × 0.3 + ((Receita - Despesas) / Receita) × 0.7
```

O resultado é apresentado em porcentagem (0–100%) com um gráfico de rosca e uma mensagem interpretativa contextualizada, como:

- *"Você está gastando mais do que ganha."*
- *"Você possui sobra mensal, mas ainda não investe."*
- *"Excelente taxa de investimento. Você está construindo patrimônio."*

---

## ⚠️ Limitações e Exclusões (MVP)

Por se tratar de um MVP acadêmico, os seguintes itens estão fora do escopo atual:

- Aplicativo mobile nativo (Android / iOS)
- Integração com Open Finance ou bancos externos
- Recomendações de investimentos por IA
- Contas compartilhadas / familiares
- Criação ou edição de categorias via chatbot
- Geração de relatórios via chatbot
- Exportação de dados em PDF ou Excel
- Autenticação com JWT ou OAuth

---

## 🔮 Próximos Passos

1. **Backend em Java** — Refatorar a API usando Java + Spring Boot para aprofundar o aprendizado e melhorar escalabilidade
2. **Chatbot avançado** — Adicionar suporte a upload de imagem (OCR em notas fiscais), envio de áudio e integração com WhatsApp via microsserviço Node.js
3. **Frontend em Next.js** — Migrar o frontend para Next.js para melhor performance, SEO e experiência do usuário
4. **Self-hosting** — Configurar servidor local doméstico com hardware dedicado para hospedar a aplicação de forma independente

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Daniel da Silva Ramos Bueno**

[![Portfolio](https://img.shields.io/badge/Portfolio-danbueno.com-orange?style=flat-square)](https://danbueno.com)
[![GitHub](https://img.shields.io/badge/GitHub-danielsrbueno-181717?style=flat-square&logo=github)](https://github.com/danielsrbueno)

---

<div align="center">

Desenvolvido com ❤️ para o projeto individual da São Paulo Tech School — 2026

</div>