from random import randint
from app.models import db, Review
from faker import Faker
fake = Faker()



images = [
    "https://media.npr.org/assets/img/2022/01/21/na-beers-counter-ebe988ba9d8751cbcbb6cd49476ba405673d252c-s1100-c50.jpg",
    "https://i.pinimg.com/originals/e1/1d/5d/e11d5d1d7c491de332fc7ff195353cd0.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/74/Swedish_beer.jpg",
    "https://vegan.com/wp-content/uploads/2019/12/beer.jpg",
    "https://cdn.pixabay.com/photo/2018/05/31/16/51/beer-3444480_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/05/06/08/49/beer-3378136_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/03/27/18/47/beers-1283566_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/03/30/13/05/beer-1290633_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/05/28/13/36/beer-2351051_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/09/05/23/33/beer-926287_960_720.jpg",

]

beerList = [
    {'id': 1, 'brewery_id': 8},
    {'id': 2, 'brewery_id': 2},
    {'id': 3, 'brewery_id': 1},
    {'id': 4, 'brewery_id': 8},
    {'id': 5, 'brewery_id': 2},
    {'id': 6, 'brewery_id': 2},
    {'id': 7, 'brewery_id': 3},
    {'id': 8, 'brewery_id': 4},
    {'id': 9, 'brewery_id': 5},
    {'id': 10, 'brewery_id': 6},
    {'id': 11, 'brewery_id': 8},
    {'id': 12, 'brewery_id': 8},
    {'id': 13, 'brewery_id': 8},
    {'id': 14, 'brewery_id': 15},
    {'id': 15, 'brewery_id': 9},
    {'id': 16, 'brewery_id': 10},
    {'id': 17, 'brewery_id': 11},
    {'id': 18, 'brewery_id': 12},
    {'id': 19, 'brewery_id': 13},
    {'id': 20, 'brewery_id': 14},
    {'id': 21, 'brewery_id': 20},
    {'id': 22, 'brewery_id': 16},
    {'id': 23, 'brewery_id': 17},
    {'id': 24, 'brewery_id': 8},
    {'id': 25, 'brewery_id': 8}]



def seed_reviews():
    for beer in beerList:
        for i in range(1, 6):
            new_review = Review(
                user_id=randint(1,21),
                brewery_id=beer["brewery_id"],
                beer_id=beer["id"],
                image_url=images[randint(0,9)],
                rating=randint(2,5),
                content=fake.text()
            )
            db.session.add(new_review)
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
