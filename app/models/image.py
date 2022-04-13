from collections import UserList
from app.models import brewery
from app.seeds import breweries, users
from .db import db

class Image(db.Model):
    __tablename__ = 'images'


    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(2048), nullable=False)

    breweries =  db.relationship('Brewery', back_populates="profile_image")
    users =  db.relationship('User', back_populates="profile_image")


    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'breweries': {brewery.id: brewery.to_dict() for brewery in breweries},
            'users': {user.id: user.to_dict() for user in users}
        }
