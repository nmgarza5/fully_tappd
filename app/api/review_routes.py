from ast import For
from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Beer, Review
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

  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      brewery_id = form.data['brewery_id'],
      beer_id = form.data['beer_id'],
      rating = form.data['rating'],
      content = form.data['content'],
      image_url = form.data['image_url']
      )


    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict()
  else:
    return {'errors': error_generator(form.errors)}, 400



@review_routes.route('/<int:id>', methods=['PUT'])
def reviewUpdate(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(id)
    if form.validate_on_submit():
        review.user_id = current_user.id,
        review.brewery_id = form.data['brewery_id']
        review.beer_id = form.data['beer_id']
        review.rating = form.data['rating']
        review.content = form.data['content']
        review.image_url = form.data['image_url']

        db.session.commit()
        return review.to_dict()
    else:
      return {'errors': error_generator(form.errors)}, 400


@review_routes.route('/<int:id>', methods=['DELETE'])
def reviewDelete(id):
  print('\n\n req --', request.json, '\n\n')
  data = {}
  review = Review.query.get(id)
  data['review'] = review.to_dict()
  db.session.delete(review)
  db.session.commit()
  return data
