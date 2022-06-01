from .db import db


class Beer(db.Model):
    __tablename__ = 'beer'


    id = db.Column(db.Integer, primary_key=True)
    brewery_id = db.Column(db.Integer, db.ForeignKey('breweries.id'), nullable=False)
    beer_image = db.Column(db.String(2048), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    style = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    # price = db.Column(db.Float, nullable=False)
    abv = db.Column(db.Float, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    # FORMAT: 2022-04-02 13:27:25.457314
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    brewery = db.relationship("Brewery", back_populates="beers")
    reviews = db.relationship("Review", back_populates="beer", cascade="all, delete-orphan")
    likes = db.relationship('BeerLike', back_populates='beer', cascade='all, delete-orphan')

    def rating(self):
        sum = 0
        for review in self.reviews:
            sum += review.rating
        try:
            return round(sum / len(self.reviews), 2)
        except:
            return 0

    def like_count(self):
        count = 0;
        for like in self.likes:
            count += 1
        return count

    def similar_beers(self):
        all_beer = Beer.query.all()
        similar_beers = [];
        for b in all_beer:
            if self.id == b.id:
                pass
            elif self.style == b.style:
                similar_beers.append(b)
            elif self.brewery_id == b.brewery_id:
                similar_beers.append(b)
        return similar_beers

    def similar_to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'brewery_id': self.brewery_id,
            'brewery_name': self.brewery.name,
            'beer_image': self.beer_image,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'brewery_id': self.brewery_id,
            'owner_id': self.brewery.owner_id,
            'brewery_name': self.brewery.name,
            'beer_image': self.beer_image,
            'description': self.description,
            'style': self.style,
            'abv': self.abv,
            'ibu': self.ibu,
            "rating": self.rating(),
            'likes': self.like_count(),
            "similar_beers": { b.id: b.similar_to_dict() for b in self.similar_beers() },
            "reviews": {review.id: review.to_dict() for review in self.reviews},
            'created_at': self.created_at
        }
