from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def ler_raiz():
    return {"mensagem": "O servidor do AjUDO está online e operante!"}