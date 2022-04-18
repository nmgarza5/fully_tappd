from .db import db
from .image import review_images


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    brewery_id = db.Column(db.Integer, db.ForeignKey('breweries.id'), nullable=False)
    beer_id = db.Column(db.Integer, db.ForeignKey('beer.id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    content = db.Column(db.Text, nullable=False)
    # FORMAT: 2022-04-02 13:27:25.457314
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    brewery = db.relationship("Brewery", backref="reviews")
    user = db.relationship("Brewery", backref="reviews")
    beer = db.relationship("Brewery", backref="reviews")
    images = db.relationship('Review', secondary=review_images, back_populates="reviews")


    '''Define rating property here. Will need to use reviews'''

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'brewery_id': self.brewery_id,
            'owner_id': self.brewery.owner_id,
            'content': self.content,
            # 'images': {url.id: url for url in self.images},
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
