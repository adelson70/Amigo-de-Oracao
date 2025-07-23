# Amigo de Oração

Este projeto é composto por duas aplicações: **Frontend** (React + Vite) e **Backend** (Node.js + Express + PostgreSQL). O objetivo é fornecer uma plataforma para salas de oração, sorteios, autenticação de usuários, geração de QR Codes e integração via WebSocket.

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação do Backend](#instalação-do-backend)
- [Instalação do Frontend](#instalação-do-frontend)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Execução dos Serviços](#execução-dos-serviços)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Contato](#contato)

---

## Pré-requisitos

- Node.js >= 18.x
- npm >= 9.x
- Docker e Docker Compose (opcional, recomendado para o backend)
- PostgreSQL >= 14 (caso não utilize Docker)

---

## Instalação do Backend


1. **Acesse a pasta do backend:**
   ```bash
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configuração do Banco de Dados:**
   - Edite o arquivo `src/config/pg.js` com as credenciais do seu banco PostgreSQL.
   - Exemplo:
     ```js
     module.exports = {
       user: 'seu_usuario', // Usuário do banco
       host: 'localhost',   // Host do banco
       database: 'amigo_oracao', // Nome do banco
       password: 'sua_senha',    // Senha do banco
       port: 5432,               // Porta padrão
     };
     ```
   - Crie o banco de dados `amigo_oracao` antes de iniciar o backend.

4. **Configuração de Email:**
   - Edite o arquivo `src/utils/email.js` para configurar o serviço de envio de emails (ex: Gmail, SMTP, etc).
   - Recomenda-se utilizar variáveis de ambiente para credenciais sensíveis.
   - Exemplo de configuração usando Gmail:
     ```js
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: process.env.EMAIL_USER, // Email remetente
         pass: process.env.EMAIL_PASS  // Senha ou App Password
       }
     });
     ```

5. **Configuração de Variáveis de Ambiente:**
   - Crie um arquivo `.env` na raiz do backend com as variáveis abaixo:
     ```env
     # Porta do servidor backend
     PORT=3000
     # Chave secreta para JWT
     JWT_SECRET=sua_chave_secreta
     # Configurações do banco de dados
     DB_USER=seu_usuario
     DB_PASSWORD=sua_senha
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=amigo_oracao
     # Configurações de email
     EMAIL_USER=seu_email@gmail.com        # Email usado para envio
     EMAIL_PASS=sua_senha_ou_app_password  # Senha ou App Password do email
     # Outras configurações
     FRONTEND_URL=http://localhost:5173    # URL do frontend para CORS
     ```
   - **Comentários:**
     - `PORT`: Porta onde o backend irá rodar.
     - `JWT_SECRET`: Chave usada para assinar tokens JWT.
     - `DB_*`: Credenciais e endereço do banco PostgreSQL.
     - `EMAIL_USER` e `EMAIL_PASS`: Credenciais do serviço de email usado para recuperação de senha e notificações.
     - `FRONTEND_URL`: URL do frontend para permitir requisições CORS.

6. **(Opcional) Utilizando Docker Compose:**
   - Edite o arquivo `docker-compose.yml` conforme necessário.
   - Execute:
     ```bash
     docker-compose up -d
     ```
   - Isso irá subir o banco de dados PostgreSQL e o backend juntos.

7. **Inicie o servidor:**
   ```bash
   npm start
   ```
   - O backend estará disponível em `http://localhost:3000` (ou porta configurada).

---

## Instalação do Frontend


1. **Acesse a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configuração de variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do frontend com o seguinte conteúdo:
     ```env
     VITE_API_URL=http://localhost:3000   # URL da API backend
     VITE_SOCKET_URL=ws://localhost:3000  # URL do WebSocket
     ```
   - **Comentários:**
     - `VITE_API_URL`: URL base para requisições à API backend.
     - `VITE_SOCKET_URL`: URL para conexão WebSocket (caso o frontend utilize sockets).

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   - O frontend estará disponível em `http://localhost:5173` (ou porta configurada).

---

## Configuração do Banco de Dados

- O projeto utiliza PostgreSQL. Você pode rodar localmente ou via Docker.
- Certifique-se de criar o banco de dados `amigo_oracao` antes de iniciar o backend.
- As migrações e modelos estão em `backend/src/models/`.

---

## Execução dos Serviços

- **Backend:**
  - Porta padrão: `3000`
  - Endpoints RESTful para autenticação, salas, usuários, QR Codes, etc.
  - WebSocket disponível para comunicação em tempo real (`backend/src/socket/`).
  - Envio de emails para recuperação de senha e notificações (`backend/src/utils/email.js`).

- **Frontend:**
  - Porta padrão: `5173`
  - Interface moderna com React, Vite e componentes customizados.

---

## Estrutura do Projeto

```
Amigo-de-Oracao/
├── backend/
│   ├── app.js
│   ├── docker-compose.yml
│   ├── package.json
│   ├── server.js
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── socket/
│       ├── temp/
│       └── utils/
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── assets/
        ├── components/
        ├── context/
        ├── pages/
        ├── routes/
        └── services/
```

---

## Funcionalidades Principais

- Autenticação de usuários e participantes
- Criação e gerenciamento de salas de oração
- Sorteio de participantes
- Geração de QR Codes
- Recuperação de senha
- Comunicação em tempo real via WebSocket
- Envio de emails para recuperação de senha e notificações
- Interface responsiva e intuitiva

---

## Contato

Para dúvidas, sugestões ou contribuições, entre em contato com o mantenedor do projeto:
- GitHub: [adelson70](https://github.com/adelson70)

---

> **Observação:**
> Este projeto está em constante evolução. Recomenda-se sempre verificar as dependências e configurações antes de executar.
