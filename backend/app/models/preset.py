from sqlalchemy import ForeignKey

from app.extensions import db


class Preset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    isPublic = db.Column(db.Integer, default=1)
    data = db.Column(db.Text)
    creator_id = db.Column(ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return f"<Preset {self.name}>"
