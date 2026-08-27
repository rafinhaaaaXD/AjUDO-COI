# AjUDO - Plataforma Inteligente do COI

O **AjUDO** é a plataforma oficial de Service Desk e Base de Conhecimento Inteligente desenvolvida para o Centro de Operações de Infraestrutura (COI). A plataforma une uma interface moderna para abertura e acompanhamento de chamados de TI a um chatbot integrado, alimentado por Inteligência Artificial (IA) e utilizando RAG (Retrieval-Augmented Generation), capaz de consultar manuais e documentos corporativos para auxiliar técnicos e usuários.

---

## Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna, dividida entre Frontend (interface e autenticação) e Backend (IA/RAG).

### Frontend & Autenticação

- **Next.js** - Framework React para renderização e gerenciamento de rotas.
- **Tailwind CSS** - Framework de estilização baseado em classes utilitárias.
- **shadcn/ui** - Biblioteca de componentes de interface acessíveis e customizáveis.
- **Better Auth** - Sistema de autenticação seguro e flexível.
- **Prisma ORM** - ORM para gerenciamento e tipagem do acesso ao banco de dados.

### Banco de Dados

- **Neon (PostgreSQL)** - Banco de dados PostgreSQL serverless hospedado na nuvem, com infraestrutura na região de São Paulo (sa-east-1), proporcionando baixa latência para aplicações no Brasil.

### Backend & Inteligência Artificial

- **Python** - Linguagem utilizada no desenvolvimento do backend e processamento dos dados.
- **LangChain / OpenAI** - Tecnologias utilizadas para processamento de linguagem natural e implementação do RAG (Retrieval-Augmented Generation), possibilitando a consulta inteligente a PDFs, manuais e demais documentos corporativos.

> **Observação:** Caso o backend de IA ainda esteja em desenvolvimento, esta seção pode ser considerada parte do planejamento da arquitetura futura.

---

## Estrutura do Projeto

O repositório está dividido em dois blocos principais:

- `/frontend`: Contém todo o código da aplicação Next.js, incluindo as páginas de Login, Chat, Service Desk e Configurações, além da comunicação com o banco de dados por meio do Prisma.
- `/backend`: Contém a API em Python, que poderá utilizar FastAPI ou Flask, responsável pelo processamento dos documentos, integração com fontes como o Google Drive e comunicação com os serviços de IA.

---

## Como Executar o Projeto Localmente

Siga os passos abaixo para executar o AjUDO em um ambiente de desenvolvimento local.

### 1. Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **Git**
- **Banco de dados PostgreSQL** (recomendado: Neon)

### 2. Clonando o Repositório

```bash
git clone https://github.com/SEU_USUARIO/AjUDO-COI.git
cd AjUDO-COI/frontend
```

### 3. Configurando as Variáveis de Ambiente

Crie um arquivo `.env` na raiz da pasta `frontend` e preencha-o com as suas credenciais:

```env
# Chave secreta utilizada pelo Better Auth para criptografia das sessões.
# Gere uma string aleatória e segura.
BETTER_AUTH_SECRET="sua_chave_secreta_aqui"

# URL de conexão com o banco de dados Neon (PostgreSQL).
DATABASE_URL="postgresql://usuario:senha@host.sa-east-1.aws.neon.tech/neondb?sslmode=require"
```

> **Importante:** Nunca versione ou compartilhe o arquivo `.env`, pois ele pode conter credenciais e chaves secretas.

### 4. Instalando as Dependências e Configurando o Banco

No terminal, dentro da pasta `frontend`, execute:

```bash
# Instala as dependências do projeto.
npm install

# Sincroniza o schema do Prisma com o banco de dados.
npx prisma db push
```

### 5. Executando o Servidor de Desenvolvimento

Execute:

```bash
npm run dev
```

Após a inicialização, o sistema estará disponível no navegador em:

**http://localhost:3000**

---

## Autenticação e Segurança

A plataforma utiliza o Better Auth integrado ao banco de dados PostgreSQL para controlar o acesso dos usuários ao sistema. A autenticação permite restringir o acesso às funcionalidades da plataforma, como a base de conhecimento e a abertura e acompanhamento de chamados (tickets).

As sessões são gerenciadas de forma segura por meio de cookies HTTP-only, reduzindo a exposição de informações de autenticação ao JavaScript executado no navegador.

> As configurações definitivas de segurança devem ser ajustadas de acordo com o ambiente de produção, incluindo políticas de senha, gerenciamento de sessões, proteção de variáveis de ambiente e controle de permissões.

---

## Identidade Visual

A interface segue a paleta de cores corporativa definida para o projeto:

- **Azul Institucional:** `#003366`
- **Amarelo Vibrante:** `#FFCC00`

---

## Objetivo do Projeto

O AjUDO foi desenvolvido com o objetivo de modernizar e otimizar o suporte de TI do COI, centralizando a abertura e o acompanhamento de chamados e oferecendo uma base de conhecimento inteligente capaz de auxiliar usuários e técnicos na resolução de problemas.
