from http import HTTPStatus

from flask import render_template, request, redirect, make_response
from flask_login import login_user, logout_user

from app.models.preset import Preset
from app.models.user import User
from app.users import bp
from app.extensions import bcrypt, db


@bp.route("/")
def index():
    users = User.query.all()
    return render_template("users/index.html", users=users)


@bp.route("/register")
def register():
    username = request.forms.get("username")
    password = request.forms.get("password")
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username, hashed_password)
    db.session.add(new_user)
    db.session.commit()
    login_user(new_user)
    return make_response("Successfully registered and logged in", HTTPStatus.OK)


@bp.route("/login")
def login():
    username = request.forms.get("username")
    password = request.forms.get("password")

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return make_response("Successfully loggen in", HTTPStatus.OK)
    else:
        return make_response("Login failed", HTTPStatus.BAD_REQUEST)


@bp.route("/logout")
def logout():
    username = request.forms.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        logout_user(user)
        return make_response("Successfully logged out", HTTPStatus.OK)
    else:
        return make_response("Logout failed", HTTPStatus.BAD_REQUEST)


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


@bp.route("/all")
def get_users():
    users = User.query.all()
    return make_response(users, HTTPStatus.OK)


@bp.route("/<int:user_id>/presets")
def get_user_presets(user_id):
    presets = Preset.query.all()
    user_presets = []
    for preset in presets:
        if int(preset["creator_id"]) == user_id:
            user_presets.append(preset)
    return make_response(user_presets, HTTPStatus.OK)
