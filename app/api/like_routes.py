from flask import Blueprint, request
from flask_login import current_user
from app.models import BeerLike, BreweryLike, User, db
import json

like_routes = Blueprint('likes', __name__)

@like_routes.route('/beer_likes', methods=['POST'])
def addBeerLike():
  id = request.json
  print("\n id ---", id, "\n")
  like = BeerLike()
  like.user_id = current_user.id
  like.beer_id = id
  db.session.add(like)
  db.session.commit()
  return like.to_dict()


@like_routes.route('/beer_likes', methods=['DELETE'])
def removeBeerLike():
  id = request.json
  like = BeerLike.query.get(int(id))
  current_user.beer_likes.remove(like)
  db.session.commit()
  return like.to_dict()

@like_routes.route('/brewery_likes', methods=['POST'])
def addBreweryLike():
  id = request.json
  like = BreweryLike()
  like.user_id = current_user.id
  like.brewery_id = id
  db.session.add(like)
  db.session.commit()
  return like.to_dict()


@like_routes.route('/brewery_likes', methods=['DELETE'])
def removeBreweryLike():
  id = request.json
  like = BreweryLike.query.get(int(id))
  current_user.brewery_likes.remove(like)
  db.session.commit()
  return like.remove_like()
