from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(2048), nullable=False)

    brewery_image = db.relationship('Brewery', back_populates="profile_image", cascade="all, delete-orphan")
    user_image = db.relationship('User', back_populates="profile_image", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'breweries': {brewery.id: brewery.to_dict() for brewery in breweries},
            'users': {user.id: user.to_dict() for user in users}
        }
