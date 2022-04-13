from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Image
# from app.forms import BreweryForm

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
