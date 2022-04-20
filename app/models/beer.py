from .db import db


class Beer(db.Model):
    __tablename__ = 'beer'


    id = db.Column(db.Integer, primary_key=True)
    brewery_id = db.Column(db.Integer, db.ForeignKey('breweries.id'), nullable=False)
    # beer_image = db.Column(db.String(2048), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    style = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    abv = db.Column(db.Float, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    # FORMAT: 2022-04-02 13:27:25.457314
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    brewery = db.relationship("Brewery", back_populates="beers")


    '''Define rating property here. Will need to use reviews'''

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'brewery_id': self.brewery_id,
            'owner_id': self.brewery.owner_id,
            'brewery_name': self.brewery.name,
            'beer_image': self.brewery.profile_image,
            'description': self.description,
            'style': self.style,
            'price': self.price,
            'abv': self.abv,
            'ibu': self.ibu,
            "reviews": {review.id: review.to_dict() for review in self.reviews},
            'created_at': self.created_at
        }
