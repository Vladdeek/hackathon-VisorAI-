from flask import Flask, render_template, redirect, request, flash, url_for, session
from flaskext.mysql import MySQL
import os
import uuid

upload_folder = 'userfiles' # папка для загрузки пользовательских фалов

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = upload_folder
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'EmpData'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

extentions_ok = ['jpg', 'png'] # допустимые разширения файлов



def exstention_check(filename):
    return True if filename.split('.')[-1].lower() in extentions_ok else False # проверка допустимости разширения

@app.route('/', methods=['GET', 'POST'])
def index():

    try: # нужна создать ключ в session иначе выдаст ошибку. Если есть варианты получше буду рад но это работает
        if session['logged']: print('logged')
    except:
        session['logged'] = False

    con = mysql.connect()
    cursor = con.cursor()

    queue_files = []

    if session['logged']:
        cursor.execute(f"SELECT * from files where status = 'queue' and user_id = {session['user']}")
        data = cursor.fetchall()
        if data:
            for d in data:
                queue_files.append({'id':d[0], 'path':d[1], 'name':d[2], 'user':d[3], 'status':d[4]})

    if request.method == 'POST':

        if not session['logged']:
            flash('Чтобы использовать web-приложение войдите в аккаунт')
            return redirect('/login')

        if 'file' not in request.files: # если файл не загружен
            flash('Файл не прикреплен')
            return redirect(request.url)
        
        file = request.files['file']
        print(file.filename)

        if file.filename == '':         # если файл пустой
            flash('Файл пуcтой')

            return redirect(request.url)
        if not exstention_check(file.filename):      # проверка раcширения
            flash('Недопустимое раcширение файла')
            return redirect(request.url)
        if file:                                      # ну и ещё одна проверка на всякий случай :)
            filename = f"{str(uuid.uuid4())}.{file.filename.split('.')[-1].lower()}" 
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            cursor.execute(f"insert into files (path, name, user_id, status) values('{filepath}', '{filename}', {session['user']}, 'queue')")

            return redirect(request.url)
    
    con.commit()
    con.close()
    return render_template('index.html', files=queue_files, logged=session['logged']) 

@app.route('/processing/<int:id>', methods=['GET', 'POST']) #или хз какую ссылку на это дело
def procesing(file_id): # Страничка обработки изображения

    if not session['logged']:
        # flash('Войдите')
        return redirect('/login')

    con = mysql.connect()
    cursor = con.cursor()
    cursor.execute(f"select * from files where id = {file_id}")
    file_data = cursor.fetchone()
    file = {'id':file_data[0], 'path':file_data[1], 'name':file_data[2], 'user_id':file_data[3], 'status':file_data[4]}

    if session['user'] != file['user_id']:
        return redirect('/')

    if request.method == 'POST':
        pass #ОБРАБОТКА ИЗОБРАЖЕНИЯ

    return render_template('processing.html', file=file)

    

@app.route('/register', methods=['GET', 'POST'])
def registration():

    if session['logged']:
        return redirect('/')

    if request.method == 'POST':
        con = mysql.connect()
        cursor = con.cursor()
        cursor.execute(f"select login from users")
        logins_q = cursor.fetchall()
        logins = [q[0] for q in logins_q]
        login = request.form.get('login')
        if login in logins:
            flash('Такой пользователь уже существует')
            return redirect(request.url)
        password = request.form.get('password')
        password2 = request.form.get('password2')
        if password != password2:
            flash('Пароли не совпадают')
            return redirect(request.url)
        cursor.execute(f"insert into users (login, password) values ('{login}', '{password}')")

        # глупо... знаю
        cursor.execute(f"select id from users where login = '{login}'")
        user_id = cursor.fetchone()[0]
        session['logged'] == True
        session['user']   == user_id

        con.commit()
        con.close()
        return redirect('/')
        
    return render_template('registation.html')

@app.route('/login', methods=['GET', 'POST'])
def login():

    if session['logged']:
        return redirect('/')

    if request.method == 'POST':
        con = mysql.connect()
        cursor = con.cursor()

        login = request.form.get('login')
        password = request.form.get('password')

        cursor.execute(f"select password, id from users where login = '{login}'")
        user = cursor.fetchone()
        if not user or login != user[0]:
            flash('Неверный логин или пароль')
            return redirect('/')

        session['logged'] == True
        session['user']   == user[1]
        return redirect('/')

    return render_template('login.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():

    user_files = None
    # В процессе

    if request.method == 'POST':
        pass #если понадобиьтся

    return render_template('profile.html' ,files=user_files)

if __name__ == '__main__':
    app.secret_key = os.urandom(24).hex()
    app.run(debug=True)