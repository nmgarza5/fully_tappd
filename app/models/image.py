# from .db import db


# review_images = db.Table(
#     "review_images",
#     db.Column("review_id", db.ForeignKey("reviews.id"), primary_key=True),
#     db.Column("images_id", db.ForeignKey("images.id"), primary_key=True)
# )

# class Image(db.Model):
#     __tablename__ = 'images'

#     id = db.Column(db.Integer, primary_key=True)
#     image = db.Column(db.String(2048), nullable=False)

#     reviews = db.relationship('Review', secondary=review_images, back_populates="images")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'image': self.image,
#             'breweries': {brewery.id: brewery.to_dict() for brewery in self.brewery_images},
#             'users': {user.id: user.to_dict() for user in self.user_images}
#         }
