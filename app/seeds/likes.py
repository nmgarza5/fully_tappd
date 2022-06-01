from random import randint
from app.models import db, BeerLike, BreweryLike
from faker import Faker
fake = Faker()




def seed_likes():
    for i in range(1, 24):
        like1 = BeerLike(
            user_id= 1,
            beer_id=i,
        )
        like2 = BeerLike(
            user_id= 2,
            beer_id=i,
        )
        like3 = BeerLike(
            user_id= 3,
            beer_id=i,
        )
        like4 = BeerLike(
            user_id= 4,
            beer_id=i,
        )
        like5 = BeerLike(
            user_id= 5,
            beer_id=i,
        )
        db.session.add(like1)
        db.session.add(like2)
        db.session.add(like3)
        db.session.add(like4)
        db.session.add(like5)


    for i in range(1, 19):
        like1 = BreweryLike(
            user_id= 1,
            brewery_id=i,
        )
        like2 = BreweryLike(
            user_id= 2,
            brewery_id=i,
        )
        like3 = BreweryLike(
            user_id= 3,
            brewery_id=i,
        )
        like4 = BreweryLike(
            user_id= 4,
            brewery_id=i,
        )
        like5 = BreweryLike(
            user_id= 5,
            brewery_id=i,
        )
        db.session.add(like1)
        db.session.add(like2)
        db.session.add(like3)
        db.session.add(like4)
        db.session.add(like5)

    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
