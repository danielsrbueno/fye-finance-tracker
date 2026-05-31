<div align="center">

<svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8202 1.17444L12.7809 2.37532C13.9186 3.7975 14.3379 5.20075 14.299 6.54704C14.2612 7.85605 13.7915 9.02304 13.3225 9.98619C13.1649 10.3098 12.9946 10.6349 12.8386 10.9327C12.7663 11.0708 12.697 11.203 12.6335 11.3265C12.4214 11.739 12.2593 12.0804 12.1563 12.3799C12.0528 12.6806 12.0336 12.8708 12.0468 12.991C12.0567 13.0817 12.0872 13.173 12.2071 13.2929C12.4054 13.4912 12.5517 13.5469 12.6404 13.5639C12.731 13.5814 12.8515 13.5757 13.0239 13.5049C13.4095 13.3463 13.8803 12.9334 14.3743 12.314C14.8488 11.719 15.2631 11.0384 15.5634 10.4938C15.712 10.2242 15.8295 9.99387 15.9091 9.83234C15.9488 9.75168 15.979 9.6885 15.9988 9.64651L16.0205 9.59999L16.0252 9.58959L16.0259 9.58824L16.026 9.5879L16.0261 9.58776L16.0261 9.58771L16.6117 8.29169L17.6332 9.28206C19.946 11.5244 20.6617 14.7623 19.1415 17.7019C17.8195 20.2583 15.1123 22 12 22C7.60499 22 4 18.5172 4 14.1697C4 11.8793 5.26687 10.2404 6.64671 8.62914C6.82673 8.41894 7.0107 8.20711 7.19757 7.99194C8.47882 6.5167 9.89649 4.88437 11.1122 2.5397L11.8202 1.17444ZM17.1269 11.7924C16.8148 12.3321 16.4089 12.9705 15.9379 13.561C15.3851 14.2542 14.6528 14.9975 13.7846 15.3546C13.33 15.5415 12.8109 15.6335 12.2624 15.5279C11.7119 15.4219 11.2196 15.1338 10.7929 14.7071C10.3617 14.2759 10.1196 13.7664 10.0586 13.2082C10.0008 12.6794 10.1126 12.1723 10.2651 11.729C10.4181 11.2846 10.6372 10.8353 10.8549 10.412C10.9327 10.2606 11.0095 10.114 11.0856 9.96886C11.2338 9.68618 11.3792 9.40866 11.5243 9.11064C11.9559 8.22433 12.2745 7.36712 12.2998 6.48929C12.3134 6.01847 12.2432 5.51449 12.0273 4.9728C10.9109 6.77097 9.71215 8.14915 8.69763 9.31555C8.51377 9.52693 8.33596 9.73135 8.16579 9.93006C6.7748 11.5543 6 12.6877 6 14.1697C6 17.3667 8.66302 20 12 20C14.3543 20 16.3818 18.6846 17.365 16.7832C18.2267 15.1169 18.1049 13.3127 17.1269 11.7924Z" fill="#f97316"/>
</svg>

# Fye Finance Tracker (MVP)

**Fuel Your Economy** — Sistema web de gestão financeira pessoal

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

[Sobre](#-sobre) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Arquitetura](#-arquitetura) • [Instalação](#-instalação) • [Uso](#-uso) • [API](#-api) • [Estrutura](#-estrutura-do-projeto) • [Próximos Passos](#-próximos-passos)

</div>

---

## 📖 Sobre

O **Fye Finance Tracker** é uma aplicação web do tipo finance tracker desenvolvida como projeto semestral individual na [São Paulo Tech School](https://www.sptechschool.com.br/), no curso de Ciência da Computação.

O projeto nasceu de uma dor real: a falta de uma ferramenta prática e visualmente clara para o controle financeiro pessoal. Mais do que um exercício acadêmico, o Fye é um MVP (Minimum Viable Product) funcional que visa contribuir com a educação financeira — tema urgente no Brasil, onde mais de 81 milhões de pessoas estão inadimplentes e apenas 39% da população sente ter real controle sobre suas finanças (Serasa Experian / Creditas, 2025–2026).

O nome **Fye** significa **Fuel Your Economy** (Impulsione a Sua Economia).

> Projeto desenvolvido por [Daniel Bueno](https://danbueno.com).

---

## ✨ Funcionalidades

### 🏠 Landing Page
- Apresentação do projeto com seções Hero, Problema e Solução
- Preview visual da dashboard em mockup de navegador
- Navegação para cadastro e login

### 🔐 Autenticação
- Cadastro de usuário com validação de campos em tempo real
- Indicador visual de força da senha
- Login com email e senha (hash SHA-256)
- Sessão gerenciada via `sessionStorage`

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

### 💳 Transações
- Cadastro de receitas, despesas e investimentos
- Edição inline de todos os campos diretamente na lista
- Exclusão de transações
- Marcação como **recorrente** (replicação automática nos meses seguintes)
- **Ordenação** por: data, categoria, valor ou nome
- **Filtro** por tipo: todos, renda, gasto ou investimento
- Ordem ascendente ou descendente

### 🏷️ Categorias
- Criação, edição e exclusão de categorias personalizadas
- Tipos: Renda, Gasto ou Investimento
- Gerenciadas via modal dedicado na página de Transações

### 🤖 Chatbot com IA (Gemini)
- Cadastro de transações por **linguagem natural**
- O usuário descreve a transação em texto livre
- A IA (Gemini 2.5 Flash) interpreta e extrai: nome, valor, data, categoria e descrição
- A transação é criada automaticamente após confirmação
- Histórico de conversa persistido via `localStorage`

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
└────────────────────────┬────────────────────────────────────┘
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
│                            │ JSON endpoints                 │
└────────────────────────────┼────────────────────────────────┘
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