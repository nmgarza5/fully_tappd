from ast import For
from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Beer, Review
from app.forms import ReviewForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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
  if "image" not in request.files:
        return {"errors": error_generator({"profile image": ["image required"]})}, 400

  image = request.files["image"]
  if not allowed_file(image.filename):
        return {"errors": error_generator({"image": ["file type not permitted"]})}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload, 400

  url = upload["url"]
  print("\n URL \n", url, '\n')

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  # print("\n FORM", form.data)
  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      brewery_id = form.data['brewery_id'],
      beer_id = form.data['beer_id'],
      rating = form.data['rating'],
      content = form.data['content'],
      image_url = url
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

    # print("\n image \n", request.files["image"], '\n')


    if "image" in request.files:
      image = request.files["image"]
      if not allowed_file(image.filename):
            return {"errors": error_generator({"image": ["file type not permitted"]})}, 400

      image.filename = get_unique_filename(image.filename)

      upload = upload_file_to_s3(image)

      if "url" not in upload:
          # if the dictionary doesn't have a url key
          # it means that there was an error when we tried to upload
          # so we send back that error message
          return upload, 400

      url = upload["url"]
    else:
      url = review.image_url

    print("\n URL \n", url, '\n')
    print("\n FORM", form.data)
    print("\n review", review.to_dict())
    if form.validate_on_submit():
        review.user_id = current_user.id,
        review.brewery_id = form.data['brewery_id']
        review.beer_id = form.data['beer_id']
        review.rating = form.data['rating']
        review.content = form.data['content']
        review.image_url = url
        db.session.commit()
        return review.to_dict()
    else:
      return {'errors': error_generator(form.errors)}, 400


@review_routes.route('/<int:id>', methods=['DELETE'])
def reviewDelete(id):
  # print('\n\n req --', request.json, '\n\n')
  data = {}
  review = Review.query.get(id)
  data['review'] = review.to_dict()
  db.session.delete(review)
  db.session.commit()
  return data
