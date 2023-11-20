from flask_login import UserMixin

from app.extensions import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    seenTutorial = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<User "{self.username}">'
