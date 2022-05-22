from flask import Blueprint, request
from flask_login import current_user
from app.models import Beer, Brewery, Like, User, db
import json

likes_routes = Blueprint('likes', __name__)

@likes_routes.route('/', methods=['POST'])
def addLike():
  id = request.json
  like = Like()
  like.user_id = current_user.id
  like.brewery_id = id
  db.session.add(like)
  db.session.commit()
  return like.to_dict()


@likes_routes.route('/', methods=['DELETE'])
def removeLike():
  id = request.json
  like = Like.query.get(int(id))
  current_user.likes.remove(like)
  db.session.commit()
  return like.to_dict()
