from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Beer, Review, Image
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


@review_routes.route('/', methods=["GET"])
def reviews():
  all_reviews = Review.query.all()
  return {review.id: review.to_dict() for review in all_reviews}


# @review_routes.route('/<int:id>', methods=["GET"])
# def singleReview(id):
#   beer = Beer.query.get(id)
#   return beer.to_dict()

@review_routes.route('/', methods=['POST'])
def create_review():
  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  images = request.json['images']
#   print('\n\n form.data', form.data, '\n\n')
#   print('\n\n form.data.brewery', form.data['brewery_id'], '\n\n')
  print("\n\nIMAGES---", images, "\n\n")

  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      brewery_id = form.data['brewery_id'],
      beer_id = form.data['beer_id'],
      rating = form.data['rating'],
      content = form.data['content'],
      )
    for image in images:
        new_image = Image(image=image)
        new_review.images.append(new_image)

    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict()
  else:
    return {'errors': error_generator(form.errors)}, 400



# @review_routes.route('/<int:id>', methods=['PUT'])
# def breweryUpdate(id):
#     form = BeerForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     beer = Beer.query.get(id)
#     if form.validate_on_submit():
#         beer.name = form.data['name'],
#         beer.brewery_id = form.data['brewery_id'],
#         beer.style = form.data['style'],
#         beer.description = form.data['description'],
#         beer.price = form.data['price'],
#         beer.abv = form.data['abv'],
#         beer.ibu = form.data['ibu']
#         db.session.commit()
#         return beer.to_dict()
#     else:
#       return {'errors': error_generator(form.errors)}, 400


# @review_routes.route('/<int:id>', methods=['DELETE'])
# def breweryDelete(id):
#   print('\n\n req --', request.json, '\n\n')
#   data = {}
#   beer = Beer.query.get(id)
#   data['beer'] = beer.to_dict()
#   db.session.delete(beer)
#   db.session.commit()
#   return data
