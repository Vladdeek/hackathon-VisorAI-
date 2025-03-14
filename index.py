from flask import Flask, render_template, redirect, request, flash, url_for, session
import os

upload_folder = 'userfiles' # папка для загрузки пользовательских фалов

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = upload_folder

extentions_ok = ['jpg', 'png'] # допустимые разширения файлов

# region ЧАСТЬ КОТОРАЯ ДОЛЖНА БЫТЬ СЕРВЕРНОЙ
glb_DB = {'files':[], 'users':[]} #БД
# endregion

#ВСЁ ЧТО ОТМЕЕНО #БД ЭТО СИМУЛЯЦИЯ РАБОТЫ БД ИБО СТРУКТУРА БД МНЕ НЕ ВЕДОМА


def exstention_check(filename):
    return True if filename.split('.')[-1].lower() in extentions_ok else False # проверка допустимости разширения

@app.route('/', methods=['GET', 'POST'])
def index():

    try: 
        if session['logged']: print('logged')
    except:
        session['logged'] = False

    global glb_DB #БД

    user_files = glb_DB['files'] #БД

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
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)

            glb_DB['files'].append({'id':3322211 ,'name':file.filename, 'path':filepath, 'user':session['user']}) #БД

            return redirect(request.url)
    return render_template('index.html', files=user_files, logged=session['logged']) 

@app.route('/processing/<int:id>', methods=['GET', 'POST']) #или хз какую ссылку на это дело
def procesing(file_id):

    global glb_DB #БД

    if not session['logged']:
        flash('Зарегистрируйтесь')
        return redirect('/login')

    if request.method == 'POST':
        pass #ОБРАБОТКА ИЗОБРАЖЕНИЯ

    #region Не обращать внимания это симуляция работы БД
    for file in glb_DB['files']: #БД
        if file['id'] == file_id: #БД
            if file['user'] != session['user']:#БД
                return redirect('/')
            procesing_file = file['path'] #БД
            return render_template('processing.html', file=procesing_file)
    return redirect('/')
    #endregion

    

@app.route('/register', methods=['GET', 'POST'])
def registration():

    if session['logged']:
        return redirect('/')

    global glb_DB

    if request.method == 'POST':
        user_id = 11222333 # AUTO INCREMENT
        login = request.form.get('login')
        password = request.form.get('password')
        password2 = request.form.get('password2')
        if password != password2:
            flash('Пароли не совпадают')
            return redirect(request.url)
        glb_DB['users'].append({'id':user_id, 'login':login, 'password':password}) #БД
        session['logged'] == True
        session['user']   == user_id
        
    return render_template('registation.html')

@app.route('/login', methods=['GET', 'POST'])
def login():

    if session['logged']:
        return redirect('/')

    global glb_DB #БД

    if request.method == 'POST':
        login = request.form.get('login')
        password = request.form.get('password')

        for user in glb_DB['users']: #БД
            if user['login'] == login and user['password'] == password: #БД
                session['logged'] == True
                session['user']   == user['id']

    return render_template('login.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():

    global glb_DB #БД
    user_files = glb_DB['files']#БД

    if request.method == 'POST':
        pass #хз че тут

    return render_template('profile.html' ,files=user_files)

if __name__ == '__main__':
    app.secret_key = os.urandom(24).hex()
    app.run(debug=True)