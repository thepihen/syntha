from http import HTTPStatus

from flask import render_template, request, redirect, make_response, jsonify
from flask_login import login_user, logout_user

from app.models.preset import Preset
from app.models.user import User
from app.users import bp
from app.extensions import bcrypt, db


@bp.route("/", methods=['GET'])
def index():
    users = User.query.all()
    return render_template("users/index.html", users=users)


@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")
        if User.query.filter_by(username=username).first():
            return make_response("Failed: username already exists", HTTPStatus.BAD_REQUEST)
        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User()
        new_user.username = username
        new_user.password = hashed_password
        new_user.seenTutorial = False
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user)
        return make_response(f"Successfully registered and logged in as {username}", HTTPStatus.OK)
    else:
        return '''
                  <form method="POST">
                      <div><label>username: <input type="text" name="username"></label></div>
                      <div><label>password: <input type="password" name="password"></label></div>
                      <input type="submit" value="Submit">
                  </form>'''


@bp.route("/login", methods=['POST'])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return make_response(f"Successfully loggen in as {username}", HTTPStatus.OK)
    else:
        return make_response("Login failed", HTTPStatus.BAD_REQUEST)


@bp.route("/logout", methods=['GET'])
def logout():
    logout_user()
    return make_response("Successfully logged out", HTTPStatus.OK)


@bp.route("/<int:user>", methods=["GET", "DELETE"])
def get_user(user_id):
    if request.method == "GET":
        user = User.query.filter_by(id=user_id)
        if user:
            return make_response(user, HTTPStatus.OK)
        else:
            return make_response("User not found", HTTPStatus.NOT_FOUND)
    elif request.method == "DELETE":
        user = User.query.filter_by(id=user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response("Successfully deleted user", HTTPStatus.OK)
        else:
            return make_response("User not found", HTTPStatus.NOT_FOUND)


@bp.route("/all", methods=['GET'])
def get_users():
    users = User.query.all()
    return make_response(jsonify(users), HTTPStatus.OK)


@bp.route("/<int:user_id>/presets", methods=['GET'])
def get_user_presets(user_id):
    presets = Preset.query.all()
    user_presets = []
    for preset in presets:
        if int(preset["creator_id"]) == user_id:
            user_presets.append(preset)
    return make_response(jsonify(user_presets), HTTPStatus.OK)
