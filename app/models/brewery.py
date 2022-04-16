from .db import db


class Brewery(db.Model):
    __tablename__ = 'breweries'


    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    profile_image = db.Column(db.String(2048), nullable=False)
    banner_image = db.Column(db.String(2048), nullable=True)
    name = db.Column(db.String(255), nullable=False)
    header = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    brewery_type = db.Column(db.String(50), nullable=False)
    street = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    postal_code = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    website_url = db.Column(db.String(255), nullable=False)
    # FORMAT: 2022-04-02 13:27:25.457314
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    owner = db.relationship("User", backref="breweries")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'owner_name': f'{self.owner.first_name} {self.owner.last_name}',
            'profile_image': self.profile_image,
            'banner_image': self.banner_image,
            'header': self.header,
            'description': self.description,
            'brewery_type': self.brewery_type,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'postal_code': self.postal_code,
            'country': self.country,
            'phone': self.phone,
            'website_url': self.website_url,
            'beer': {beer.id: beer.to_dict() for beer in self.beer}
        }
