from flask import Blueprint, request
from flask_login import current_user
from app.models import Brewery, db, User, Beer
from app.forms import BeerForm

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
  return {'beer': [beer.to_dict() for beer in all_beer]}
