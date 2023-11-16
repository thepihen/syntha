from bottle import *

@route('/')
@route('/hello/<name>')
def greet(name='Stranger'):
	return f"Hello {name}!"

@route('/login')
def login():
	return '''
		<form action="/login" method="post" accept-charset="utf-8">
			Username: <input name="username" type="text" />
			Password: <input name="password" type="password" />
			<input value="Login" type="submit" />
		</form>
	'''


@route('/login', method='POST')
def do_login():
	username = request.forms.get('username')
	password = request.forms.get('password')
	response.content_type = 'text/html; charset=UTF8'
	print(f"username = {username}, password = {password}")
	return f"Logged in!"

@route('/restricted')
def restricted():
	abort(401, "ACCESS DENIED!")

run(host='localhost', port=8080, debug=True)