from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import randint
fake = Faker()

images = [
    {
        "image": "https://cdn.drawception.com/images/avatars/647493-B9E.png",
    },
    {
        "image": "http://pm1.narvii.com/6636/ddaf1c402f3767d7c934aac8520aa12c023fd31c_00.jpg",
    },
    {
        "image": "https://cdna.artstation.com/p/assets/images/images/021/935/626/large/irina-nikiforova-purple.jpg",
    },
    {
        "image": "https://i.imgur.com/AtjuEkK.png",
    },
    {
        "image": "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png",
    },
    {
        "image": "https://www.finetoshine.com/wp-content/uploads/2020/09/Cartoon-Profile-Pictures-on-Instagram-Here-are-some-really-random.jpg",
    },
    {
        "image": "https://miro.medium.com/max/400/1*B8c1ED3QV_yaa6PAWqDgMw.png",
    },
    {
        "image": "https://img.itch.zone/aW1hZ2UvNTc0NjkvOTEwODg5LmdpZg==/original/lvbnSq.gif",
    },
    {
        "image": "https://i.pinimg.com/736x/dc/28/a7/dc28a77f18bfc9aaa51c3f61080edda5.jpg",
    },
    {
        "image": "https://xf-assets.pokecharms.com/data/attachment-files/2015/10/236933_Charmander_Picture.png",
    },
    {
        "image": "https://res.cloudinary.com/practicaldev/image/fetch/s--4mfNEQ_X--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/616404/2501bf53-b528-4223-ba4e-4776d7f743d3.jpeg",
    },
    {
        "image": "https://www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js-150x150.png",
    },
    {
        "image": "https://pbs.twimg.com/media/DpfGhyLVAAAzxkq.jpg",
    },
    {
        "image": "https://i.imgur.com/RM2ln57.jpg",
    },
    {
        "image": "https://i.imgur.com/oW1dGDI.jpeg",
    },
    {
        "image": "https://i.imgur.com/pBcut2e.jpeg",
    },
    {
        "image": "https://i.imgur.com/6qSyTVx.jpeg",
    },
    {
        "image": "https://i.imgur.com/fR1xMw0.jpeg",
    },
    {
        "image": "https://i.imgur.com/fR1xMw0.jpeg",
    },
]


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        business_user=True,
        username='keith-stone',
        first_name='Keith',
        last_name='Stone',
        birthdate= '1994-04-15T16:29:17.000Z',
        email='demo@demo.com',
        password='password',
        profile_image = "https://pbs.twimg.com/profile_images/2521709236/image_400x400.jpg")
        # banner_image = "https://freight.cargo.site/t/original/i/cae1c483c916f1ce2f25ccafec7b64f0f4a5075bdf8c74dae0909534a6a82851/Limit_A.jpg",
        # header='Always Smooth')
        # bio='The human embodiment of smoothness. Never without my case of ice cold stones and smooth pick up lines.')
    db.session.add(demo)


    for image in images:
        name = fake.first_name()
        owner = User(
            business_user=True,
            username=f'{name}{randint(1,5)}{randint(1,5)}{randint(1,5)}',
            first_name=name,
            last_name=fake.last_name(),
            birthdate= '1994-04-15T16:29:17.000Z',
            email=fake.unique.email(),
            hashed_password=generate_password_hash(fake.password()),
            profile_image= image["image"])
            # banner_image= "https://aristocratpub.com/wp-content/uploads/2017/05/banner.jpg",
            # header=fake.text())
            # bio=fake.text())
        db.session.add(owner)

    demo2 = User(
        business_user=False,
        username='keith-stone2',
        first_name='Keith',
        last_name='Stone',
        birthdate= '1994-04-15T16:29:17.000Z',
        email='demo1@demo.com',
        password='password',
        profile_image = "https://pbs.twimg.com/profile_images/2521709236/image_400x400.jpg")
        # banner_image = "https://freight.cargo.site/t/original/i/cae1c483c916f1ce2f25ccafec7b64f0f4a5075bdf8c74dae0909534a6a82851/Limit_A.jpg",
        # header='Always Smooth')
        # bio='The human embodiment of smoothness. Never without my case of ice cold stones and smooth pick up lines.')
    db.session.add(demo2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
