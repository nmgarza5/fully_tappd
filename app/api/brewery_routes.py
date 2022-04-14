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
      postal_code = form.data['postal_code'],
      country = form.data['country'],
      phone_number = form.data['phone_number'],
      website_url = form.data['website_url'])
    new_brewery.profile_image = new_image
    current_user.user_status()
    db.session.add(new_brewery)
    db.session.commit()
    return new_brewery.to_dict()
  else:
    return {'errors': error_generator(form.errors)}, 400
