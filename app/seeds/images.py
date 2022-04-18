from app.models import db, Image

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
        "image": "https://i.imgur.com/T46dDXs.png",
    },
    {
        "image": "https://i.imgur.com/AwZdvAY.png",
    },

]


def seed_images():
    for image in images:
        new_image = Image(
            url=image['url']
            )
        db.session.add(new_image)



    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
