from flask import Flask
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

# carregar .env
load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')

# iniciar o app
app = Flask(__name__)
CORS(app)

def connect_db():
    #conexao com o banco de dados
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

# importar as rotas
from . import routes
