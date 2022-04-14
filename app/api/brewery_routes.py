from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Image
from app.forms import BreweryForm

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
  return {'breweries': [brewery.to_dict() for brewery in breweries]}


@brewery_routes.route('/<int:id>', methods=["GET"])
def brewery(id):
  brewery = Brewery.query.get(id)
  return brewery.to_dict()

@brewery_routes.route('/', methods=['POST'])
def create_brewery():
  form = BreweryForm()
  profile_image = request.json['profile_image']
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_image = Image(image=profile_image)
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
      website_url = form.data['website_url'])
    new_brewery.profile_image = new_image
    current_user.user_status()
    db.session.add(new_brewery)
    db.session.commit()
    return new_brewery.to_dict()
  else:
    return {'errors': error_generator(form.errors)}, 400



@brewery_routes.route('/<int:id>', methods=['PUT'])
def breweryUpdate(id):
    form = BreweryForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    req_image = request.json['profile_image']
    print('\n\nREQUEST--------', request.json, '\n\n')
    brewery = Brewery.query.get(id)

    if brewery.profile_image != req_image:
      profile_image = Image(image=req_image)
    else:
      image = Image.query.filter(Image.image == req_image).first()
      profile_image = Image.query.get(image.id)

    print('\n\nBEFore - SUCCESS', brewery, '\n\n')

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
        brewery.website_url = form.data['website_url']
        brewery.profile_image = profile_image
        db.session.commit()
        print('\n\nREST - SUCCESS', brewery, '\n\n')
        return brewery.to_dict()
    else:
      return {'errors': error_generator(form.errors)}, 400


@brewery_routes.route('/<int:id>', methods=['DELETE'])
def breweryDelete(id):
  data = {}
  brewery = Brewery.query.get(id)
  data['restaurant'] = brewery.to_dict()
  db.session.delete(brewery)
  db.session.commit()
