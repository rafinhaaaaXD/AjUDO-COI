# 📘 Guia de Estudo: Projeto AjUDO (Oráculo COI)

**Objetivo da Missão:** Desenvolver um sistema RAG (*Retrieval-Augmented Generation*) para a UDO.
**O que é isso?** É como dar uma "apostila" (seus PDFs e manuais do Drive) para um aluno superdotado (a Inteligência Artificial) ler e responder perguntas da equipe do COI baseando-se *apenas* nessa apostila.

---

## 🏗️ 1. A Arquitetura: Como dividimos a casa?
Para o sistema ser profissional, dividimos ele em duas partes que conversam entre si:
*   **O Backend (O Motor/Cérebro):** Fica nos bastidores. Feito em **Python**. É ele que lê arquivos, conecta com a IA e processa os dados.
*   **O Frontend (A Fachada/Rosto):** O que o usuário vê. Começamos com HTML/CSS, mas evoluímos para **React/Next.js** (gerado pelo v0.dev) para termos uma interface de alto nível.

---

## ⚙️ 2. Construindo o Backend (Python)

### A. O Isolamento (Ambiente Virtual)
Na TI, nunca instalamos bibliotecas soltas no computador para não dar conflito. Criamos uma "bolha".
*   **O que fizemos:** Rodamos `python -m venv venv`.
*   **O problema que deu:** O Windows bloqueou a ativação por segurança (`UnauthorizedAccess`).
*   **A solução:** Rodamos `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` para avisar ao Windows que nós somos os donos da máquina e os scripts daquela pasta são seguros. Depois, ativamos a bolha com `.\venv\Scripts\activate`.

### B. As Ferramentas do Pedreiro (Bibliotecas)
Rodamos o comando `pip install fastapi uvicorn langchain openai python-dotenv`.
*   **`fastapi`:** A ferramenta que cria o servidor (as rotas do nosso site).
*   **`uvicorn`:** O "garçom". O FastAPI cozinha o código, o Uvicorn serve para o navegador.
*   **`langchain`:** O tradutor que vai ajudar o Python a ler PDFs e falar com a IA.

### C. O Primeiro Sopro de Vida (Hello World)
Criamos o arquivo `backend/main.py` com o seguinte código:

```python
from fastapi import FastAPI

# 1. Instanciamos a nossa aplicação (O nascimento do servidor)
app = FastAPI()

# 2. Criamos uma "rota" (Um endereço). O "/" significa a página inicial.
@app.get("/")
def ler_raiz():
    # Quando alguém acessar a raiz, o servidor devolve essa mensagem
    return {"mensagem": "Salve Maria! O servidor do AjUDO está online e operante!"}