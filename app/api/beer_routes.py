from enum import unique
from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Beer
from app.forms import BeerForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

beer_routes = Blueprint('beer', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


@beer_routes.route('/', methods=["GET"])
def beer():
  all_beer = Beer.query.all()
  return {beer.id: beer.to_dict() for beer in all_beer}


@beer_routes.route('/<int:id>', methods=["GET"])
def singleBeer(id):
  beer = Beer.query.get(id)
  return beer.to_dict()

@beer_routes.route('/', methods=['POST'])
def create_brewery():
  form = BeerForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if "image" not in request.files:
      return {"errors": error_generator({"image": ["image required"]})}, 400

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

  if form.validate_on_submit():
    new_beer = Beer(
      name = form.data['name'],
      brewery_id = form.data['brewery_id'],
      style = form.data['style'],
      description = form.data['description'],
      # price = form.data['price'],
      abv = form.data['abv'],
      ibu = form.data['ibu'],
      beer_image = url
      )
    db.session.add(new_beer)
    db.session.commit()
    return new_beer.to_dict()
  else:
    return {'errors': error_generator(form.errors)}, 400



@beer_routes.route('/<int:id>', methods=['PUT'])
def breweryUpdate(id):
    form = BeerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    beer = Beer.query.get(id)
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
      url = beer.beer_image

    if form.validate_on_submit():
        beer.name = form.data['name'],
        beer.brewery_id = form.data['brewery_id'],
        beer.style = form.data['style'],
        beer.description = form.data['description'],
        # beer.price = form.data['price'],
        beer.abv = form.data['abv'],
        beer.ibu = form.data['ibu'],
        beer.beer_image = url
        db.session.commit()
        return beer.to_dict()
    else:
      return {'errors': error_generator(form.errors)}, 400


@beer_routes.route('/<int:id>', methods=['DELETE'])
def breweryDelete(id):
  data = {}
  beer = Beer.query.get(id)
  data['beer'] = beer.to_dict()
  db.session.delete(beer)
  db.session.commit()
  return data
