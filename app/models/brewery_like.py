from .db import db


class BreweryLike(db.Model):
    __tablename__ = 'brewery_likes'

    id = db.Column(db.Integer, primary_key=True)
    brewery_id = db.Column(db.Integer, db.ForeignKey('breweries.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    brewery = db.relationship('Brewery', back_populates="likes")
    user = db.relationship('User', back_populates="brewery_likes")

    def to_dict(self):
        return {
            'id': self.id,
            'brewery_id': self.brewery_id,
            'user_id': self.user_id
        }
