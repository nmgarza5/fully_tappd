from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User
from app.forms import BreweryForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


brewery_routes = Blueprint('breweries', __name__)

def error_generator(validation_errors):
  errors = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errors.append(f'{field} : {error}')
  return errors


@brewery_routes.route('/', methods=["GET"])
def breweries():
  breweries = Brewery.query.all()
  return {brewery.id: brewery.to_dict() for brewery in breweries}



@brewery_routes.route('/my-brewery', methods=["GET"])
def my_brewery():
  my_brewery = Brewery.query.filter(Brewery.owner_id == current_user.id).first()
  return my_brewery.to_dict()


@brewery_routes.route('/<int:id>', methods=["GET"])
def brewery(id):
  brewery = Brewery.query.get(id)
  return brewery.to_dict()

@brewery_routes.route('/', methods=['POST'])
def create_brewery():
  form = BreweryForm()
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
    new_brewery =Brewery(
      owner_id = current_user.id,
      name = form.data['name'],
      header = form.data['header'],
      description = form.data['description'],
      brewery_type = form.data['brewery_type'],
      street = form.data['street'],
      city = form.data['city'],
      state = form.data['state'],
      postal_code = form.data['postal_code'],
      country = form.data['country'],
      phone = form.data['phone'],
      profile_image = url)
    db.session.add(new_brewery)
    db.session.commit()
    return new_brewery.to_dict()
  else:
    return {'errors': error_generator(form.errors)}, 400



@brewery_routes.route('/<int:id>', methods=['PUT'])
def breweryUpdate(id):
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    brewery = Brewery.query.get(id)
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
      url = brewery.profile_image

    if form.validate_on_submit():
        brewery.owner_id = current_user.id,
        brewery.name = form.data['name'],
        brewery.header = form.data['header'],
        brewery.description = form.data['description'],
        brewery.brewery_type = form.data['brewery_type'],
        brewery.street = form.data['street'],
        brewery.city = form.data['city'],
        brewery.state = form.data['state'],
        brewery.postal_code = form.data['postal_code'],
        brewery.country = form.data['country'],
        brewery.phone = form.data['phone'],
        # brewery.website_url = form.data['website_url']
        brewery.profile_image = url
        db.session.commit()
        return brewery.to_dict()
    else:
      return {'errors': error_generator(form.errors)}, 400


@brewery_routes.route('/<int:id>', methods=['DELETE'])
def breweryDelete(id):
  # print('\n\n req --', request.json, '\n\n')
  data = {}
  brewery = Brewery.query.get(id)
  data['brewery'] = brewery.to_dict()
  db.session.delete(brewery)
  db.session.commit()
  return data
