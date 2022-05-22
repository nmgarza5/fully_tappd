from .db import db


class BeerLike(db.Model):
    __tablename__ = 'beer_likes'

    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    beer = db.relationship('Beer', back_populates="likes")
    user = db.relationship('User', back_populates="beer_likes")

    def to_dict(self):
        return {
            'id': self.id,
            'beer_id': self.beer_id,
            'user_id': self.user_id
        }
