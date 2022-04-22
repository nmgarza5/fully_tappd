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
  # print('\n\n ALL BEER --', all_beer, '\n\n')
  return {beer.id: beer.to_dict() for beer in all_beer}


@beer_routes.route('/<int:id>', methods=["GET"])
def singleBeer(id):
  beer = Beer.query.get(id)
  return beer.to_dict()

@beer_routes.route('/', methods=['POST'])
def create_brewery():
  form = BeerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  # print('\n\n form.data', form.data, '\n\n')
  # print('\n\n form.data.brewery', form.data['brewery_id'], '\n\n')

  if form.validate_on_submit():
    new_beer = Beer(
      name = form.data['name'],
      brewery_id = form.data['brewery_id'],
      style = form.data['style'],
      description = form.data['description'],
      # price = form.data['price'],
      abv = form.data['abv'],
      ibu = form.data['ibu']
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
    print("\n\n FORMDATA\n", form.data)
    if form.validate_on_submit():
        beer.name = form.data['name'],
        beer.brewery_id = form.data['brewery_id'],
        beer.style = form.data['style'],
        beer.description = form.data['description'],
        # beer.price = form.data['price'],
        beer.abv = form.data['abv'],
        beer.ibu = form.data['ibu']
        db.session.commit()
        return beer.to_dict()
    else:
      return {'errors': error_generator(form.errors)}, 400


@beer_routes.route('/<int:id>', methods=['DELETE'])
def breweryDelete(id):
  # print('\n\n req --', request.json, '\n\n')
  data = {}
  beer = Beer.query.get(id)
  data['beer'] = beer.to_dict()
  db.session.delete(beer)
  db.session.commit()
  return data
