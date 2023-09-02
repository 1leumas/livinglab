from . import app, connect_db  # Importar a função connect_db
from flask import jsonify, request  # Importar request
from datetime import date, datetime, timedelta  # Importar bibliotecas de data e hora

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
    
#rota para saber as colunas de alguma tabela
@app.route('/api/columns/<string:table_name>', methods=['GET'])
def list_columns(table_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        # Consulta SQL para listar os nomes das colunas da tabela
        query = f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}';"
        cursor.execute(query)
        # Pegar todos os nomes de coluna e colocá-los em uma lista
        columns = [column[0] for column in cursor.fetchall()]
        cursor.close()
        connection.close()
        return jsonify(status="success", columns=columns), 200
    except Exception as e:
        return jsonify(status="error", message=str(e)), 500
    
#rota para saber todos os dados de uma certa tabela
@app.route('/api/data/<string:table_name>', methods=['GET'])
def get_table_data(table_name):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        query = f"SELECT * FROM {table_name};"
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(status="success", data=data), 200
    except Exception as e:
        return jsonify(status="error", message=str(e)), 500

#rota para saber o ultimo dado
@app.route('/api/data/latest', methods=['GET'])
def get_latest_data():
    try:
        connection = connect_db()
        cursor = connection.cursor()
        # Consulta para obter o registro mais recente com base na coluna 'time'
        query = f"SELECT * FROM k72623_lo ORDER BY time DESC LIMIT 1;"
        cursor.execute(query)
        # Pegar o dado mais recente
        latest_data = cursor.fetchone()
        cursor.close()
        connection.close()
        return jsonify(status="success", latest_data=latest_data), 200
    except Exception as e:
        return jsonify(status="error", message=str(e)), 500
    
#rota para as trends
@app.route('/api/trends', methods=['GET'])
def get_trends_data():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        # Recupera parâmetros de consulta
        time_range = request.args.get('time_range')
        start_date_str = request.args.get('start_date')
        end_date_str = request.args.get('end_date')

        query = "SELECT * FROM k72623_lo WHERE 1=1"

        # Se as datas de início e término estiverem disponíveis, use-as
        if start_date_str and end_date_str:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
            query += f" AND time >= '{start_date}' AND time <= '{end_date}'"

        # Caso contrário, use o intervalo de tempo fornecido
        elif time_range:
            start_date = datetime.now()
            if time_range == 'lastDay':
                start_date -= timedelta(days=1)
            elif time_range == 'lastWeek':
                start_date -= timedelta(weeks=1)
            elif time_range == 'lastMonth':
                start_date -= timedelta(days=30)
            elif time_range == 'last3Months':
                start_date -= timedelta(days=90)
            elif time_range == 'allTime':
                start_date = date(1970, 1, 1)
            query += f" AND time >= '{start_date}'"

        query += " ORDER BY time ASC;"
        
        cursor.execute(query)
        data = cursor.fetchall()

        cursor.close()
        connection.close()
        return jsonify(status="success", data=data), 200

    except Exception as e:
        return jsonify(status="error", message=str(e)), 500