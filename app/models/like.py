from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'), nullable=True)
    brewery_id = db.Column(db.Integer, db.ForeignKey('beer.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    beers = db.relationship('Beer', back_populates="likes")
    breweries = db.relationship('Brewery', back_populates="likes")
    user = db.relationship('User', back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'beer_id': self.brewery_id,
            'brewery_id': self.brewery_id,
            'user_id': self.user_id
        }
