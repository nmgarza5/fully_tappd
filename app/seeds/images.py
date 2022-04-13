from app.models import db, Image

images = [
    {
        "image": "https://sfbeerweek.org/assets/14/14-fb1b134df7f7cbfa5f5ee4e495185.jpg",
    },
    {
        "image": "https://thecraftycask.com/wp-content/uploads/2019/05/IMG_5646-1080x675_1e7961afb0e86b8f45b9f5c9e5969465_2000.jpg",
    },
    {
        "image": "https://untappd.akamaized.net/site/brewery_logos_hd/brewery-325256_26582_hd.jpeg",
    },
    {
        "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/14/8b/ae/80/47-hills-brewing-company.jpg",
    },
    {
        "image": "https://s.hdnux.com/photos/0/0/0/17629041/4/900x0.jpg",
    },
    {
        "image": "https://www.visitcalifornia.com/sites/visitcalifornia.com/files/styles/welcome_image/public/VC_Breweries_Module7_AnchorBrewing_Supplied_brewhouse-wide_1280x640.jpg",
    },
    {
        "image": "https://everythingsouthcity.com/wp-content/uploads/2019/09/armstrong-logo.jpg",
    },
    {
        "image": "https://s.hdnux.com/photos/01/13/41/12/19796626/3/rawImage.jpg",
    },
    {
        "image": "https://images.squarespace-cdn.com/content/v1/581a2d252994ca082120e432/1501624389786-XAIEI4N3ZOOPUW4GVRZG/whitelogo.png",
    },
    {
        "image": "https://www.itasteit.com/media/reviews/photos/thumbnail/1500x500s/2a/bb/e6/barebottle-brewing-company-98-1466619627.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/420293260016230400/Ow5quOHL_400x400.jpeg",
    },
    {
        "image": "https://juliesfreebies.com/wp-content/uploads/2021/05/barrellhead.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/885917064828862464/ErVbyAIR_400x400.jpg",
    },
    {
        "image": "https://bier-traveller.com/wp-content/uploads/2018/09/San-Francisco-Bier-Traveller.com-Jun2-29-1.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/804035762555469824/smxXVED7_400x400.jpg",
    },
    {
        "image": "https://viatravelers.com/wp-content/uploads/2021/11/Cellarmaker-Brewing-Company.jpg",
    },
    {
        "image": "https://d2pxm94gkd1wuq.cloudfront.net/BreweryLogos/Standard/7442.fort-point-beer-company.jpg",
    },
    {
        "image": "https://www.firstrepublic.com/-/media/frb/images/articles/articles-2019/745x390-client-spotlight-why-fort-point-beer-company-is-thriving-in-a-competitive-market.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/1290478841878568960/l5ffXIW7_400x400.jpg",
    },
    {
        "image": "https://www.bayareamade.us/wp-content/uploads/beans/images/Harmonic-2v-7ffcb07.jpg",
    },
    {
        "image": "https://i.pinimg.com/originals/cb/f8/07/cbf807339acd40601b2e9112eb2da6ca.png",
    },
    {
        "image": "https://images.squarespace-cdn.com/content/v1/56e88f0420c64741f20eecc3/1524614540541-L8RX31RLFAKJI16EHZLO/0U3A9778_web.jpg",
    },
    {
        "image": "https://localbrewingco.com/cms/wp-content/themes/lbc/img/beers/beer-goblet-medium-dark.png",
    },
    {
        "image": "https://cloudinary-assets.dostuffmedia.com/res/dostuff-media/image/upload/venue-396045/1492190815.jpg",
    },
    {
        "image": "https://d1ynl4hb5mx7r8.cloudfront.net/wp-content/uploads/2018/10/02080257/92b832c1f15e938b5455.png",
    },
    {
        "image": "https://resizer.otstatic.com/v2/photos/wide-huge/3/42779280.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/689590365901336576/XBRvAIHm_400x400.jpg",
    },
    {
        "image": "https://bartable.bart.gov/sites/default/files/styles/body_width_/public/images/discoveries/AleIndustries-FB.jpg",
    },
    {
        "image": "https://d2pxm94gkd1wuq.cloudfront.net/BreweryLogos/Standard/397393838.divingdogbrewhouse.jpg",
    },
    {
        "image": "https://cdn.vox-cdn.com/thumbor/WdKTnUZRBG4tr1WRaJsKiCqB8ls=/0x0:1500x807/1200x800/filters:focal(630x284:870x524)/cdn.vox-cdn.com/uploads/chorus_image/image/65111837/dog_photos_above_kettles_resize_1500x807.0.jpg",
    },
    {
        "image": "https://drinkbaybeer.com/assets/17/17-c8251448cf0ef9d779c7296dd071e.png",
    },
    {
        "image": "https://images.squarespace-cdn.com/content/v1/5c16d35a7e3c3a927a76ec36/1584849061818-MNYYO5LQJD0FFWRM6ULV/FEd+Front+of+Building+%281%29.jpeg",
    },
    {
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b7/FunkyBuddhaLogo.jpg",
    },
    {
        "image": "https://media2.miaminewtimes.com/mia/imager/u/original/9411823/new_times_funky_buddha-7165.jpg",
    },
    {
        "image": "https://images.editor.website/uploads/b/cbcb8c00-6983-11ea-8683-23d0eb73c404/GTB_Logo.png",
    },
    {
        "image": "https://images.squarespace-cdn.com/content/v1/5abc00a1c258b4f56d094ecc/1526193436940-KH8O482HTZUKS1JMZJ1N/40092310410_1571298bfc_k-1.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/681682320911237122/RcoiyJh9_400x400.jpg",
    },
    {
        "image": "https://cdn.hopculture.com/wp-content/uploads/2017/01/The-Independent-Brewing-Lead.jpg",
    },
    {
        "image": "https://pbs.twimg.com/profile_images/1085257517641486337/7nxEF3jQ_400x400.jpg",
    },
    {
        "image": "https://images.squarespace-cdn.com/content/v1/54613e97e4b00403fdda207f/1642450215996-ZWKKRZVR2NWTMG0V27RG/IMG_6569.jpg",
    },
    {
        "image": "https://images.squarespace-cdn.com/content/v1/54613e97e4b00403fdda207f/1642450215996-ZWKKRZVR2NWTMG0V27RG/IMG_6569.jpg",
    },
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
        new_image = Image(image=image['image'])
        db.session.add(new_image)



    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
