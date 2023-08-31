from . import app, connect_db  # importar a funcao connect_db
from flask import jsonify

# rota para saber se a conexao foi estabelecida
@app.route('/api/db-status', methods=['GET'])
def db_status():
    try:
        connection = connect_db()
        # se a conexão for bem-sucedida, fechar
        connection.close()
        return jsonify(status="success", message="Connected to the database successfully."), 200
    except Exception as e:
        return jsonify(status="error", message=str(e)), 500

# rota para saber todas as tabelas
@app.route('/api/tables', methods=['GET'])
def list_tables():
    try:
        connection = connect_db()
        cursor = connection.cursor()
        query = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';"
        cursor.execute(query)
        tables = [table[0] for table in cursor.fetchall()]
        cursor.close()
        connection.close()
        return jsonify(status="success", tables=tables), 200
    except Exception as e:
        return jsonify(status="error", message=str(e)), 500

#rota para saber os dados de uma certa tabela
@app.route('/api/data/<string:table_name>', methods=['GET'])
def get_table_data(table_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        query = f"SELECT * FROM {table_name} LIMIT 1;"  # limitar a 10 para nao vir muitos dados
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(status="success", data=data), 200
    except Exception as e:
        return jsonify(status="error", message=str(e)), 500