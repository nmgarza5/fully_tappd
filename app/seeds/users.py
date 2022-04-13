from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        business_user=True,
        username='keith-stone',
        first_name='Keith',
        last_name='Stone',
        email='demo@demo.com',
        password='password',
        profile_image_id=41,
        header='Always Smooth',
        bio='The human embodiment of smoothness. Never without my case of ice cold stones and smooth pick up lines.')
    db.session.add(demo)

    for i in range(42, 61):
        name = fake.first_name()
        owners = User(
            business_user=True,
            username=f'{name}{randint(1,5)}{randint(1,5)}{randint(1,5)}',
            first_name=name,
            last_name=fake.last_name(),
            email=fake.unique.email(),
            hashed_password=generate_password_hash(fake.password()),
            profile_image_id=i,
            header=fake.text(),
            bio=fake.text())
        db.session.add(owners)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
