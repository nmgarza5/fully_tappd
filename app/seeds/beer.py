from random import randint
from app.models import db, Beer
from faker import Faker
fake = Faker()

beer_choices = [
    "Altbier", "Amber Ale", "Barley Wine", "Berliner Weisse", "Blonde Ale", "Bock", "Brown Ale", "Cream Ale", "Dopplebock",
    "Doppelbock", "English Bitter", "English Mild", "Fruit Beer", "Gose", "Gueze", "Hefeweizen", "Helles Bock", "IPA", "Kolsch",
    "Lager", "Lambic", "Oktoberfestbier", "Pale Ale", "Pilsner", "Porter", "Red Ale", "Saison", "Stout", "Witbier",
]

# print(len(beer_choices))

beer_list = [
  {
    "name": "Mt Nelson",
    "brewery_id": 8,
    "description": "Hopped with 100% Nelson Sauvin hops. As you contemplate the path to the top of Mt. Nelson think about the 2.5 lbs. per barrel of New Zealand Nelson Sauvin hops in this precarious pale ale. Ruminate on the diesely, tropical fruit and melon aromas. May we suggest a word of advice: it's not the summit of Mt. Nelson you need to worry about, rather, the way down to the bottom.",
    "style": "IPA",
    "beer_image": "https://cellarmakerbrewing.com/wp-content/uploads/2020/04/MountNelson1.jpg",
    "price": 7,
    "abv": 6.5,
    "ibu": 60
  },
  {
    "name": 'Pale Intoxication',
    "brewery_id": 2,
    "description": 'A titillating, neurotic, peroxide punk of an IPA. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached.',
    "style": "IPA",
    "beer_image": "https://untappd.akamaized.net/photo/2022_04_14/820ac664c13723f0d70afe2f9db4e82d_c_1147828408_640x640.jpg",
    "price": 7,
    "abv": 4.1,
    "ibu": 41.5
  },
  {
    "name": 'Seven Stills IPA',
    "brewery_id": 1,
    "description": 'A light, crisp and bitter IPA brewed with English and American hops.',
    "style": "IPA",
    "beer_image": "https://drinkbaybeer.com/assets/18/18-823d986323f7b7f8d09b26e8f8f51.jpg",
    "price": 7,
    "abv": 6.0,
    "ibu": 60
  },
  {
    "name": "Mo' Citra",
    "brewery_id": 8,
    "description": "If you don't know, “Mo” stands for Mosaic. The Mo' beers are always a two-hop beer featuring Mosaic, one of our favorite and maybe the most versatile of IPA hops, with one other world class hop. The 2nd is Citra, a hop to which we dedicate much of our time searching for the fruitiest, most aromatic version from year to year. Passionfruit, tangerine & forest pine!",
    "style": "IPA",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-626873_ac9c4_hd.jpeg",
    "price": 7,
    "abv": 6.3,
    "ibu": 55
  },
  {
    "name": 'Yelling At Cars',
    "brewery_id": 2,
    "description": 'Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them. This Pilsner exemplifies that.',
    "style": "Pilsner",
    "beer_image": "https://untappd.akamaized.net/photo/2022_04_15/41dfc2f2df1b902e6bb5f32e6dabc827_c_1148573487_640x640.jpg",
    "price": 7,
    "abv": 5.2,
    "ibu": 35
  },
  {
    "name": 'Farmhouse Ale',
    "brewery_id": 2,
    "description": 'Fruity, spicy, medium bodied Belgian style ale with Kveik yeast and hopped with Horizon hops',
    "style": "Saison",
    "beer_image": "https://untappd.akamaized.net/photos/2022_04_22/6ad50ade6e9020e1fe8b649376e7a0b1_640x640.jpg",
    "price": 7,
    "abv": 6.4,
    "ibu": 28
  },
  {
    "name": 'Steam Beer',
    "brewery_id": 3,
    "description": "Anchor Steam® Beer derives its unusual name from the 19th century when 'steam' was a nickname for beer brewed on the West Coast of America under primitive conditions and without ice. While the origin of the name remains shrouded in mystery, it likely relates to the original practice of fermenting the beer on San Francisco's rooftops in a cool climate. In lieu of ice, the foggy night air naturally cooled the fermenting beer, creating steam off the warm open pans. Once a nickname for any Californian or West Coast beer brewed under these conditions, today the name 'steam' is a trademark of Anchor Brewing and applies only to the singular process and taste of our flagship brand - San Francisco's original Anchor Steam® Beer. The classic of American brewing tradition since 1896.",
    "style": "Amber Ale",
    "beer_image": "https://s3.amazonaws.com/anchor_cms_production/beers/1/original/Steam_CanBottlePint_v2.png",
    # "price": 7,
    "abv": 4.9,
    "ibu": 35
  },
  {
    "name": 'Club Haus, Golf Lager',
    "brewery_id": 5,
    "description": 'Crush birdies & brews. Tee off into notes of sweet toast & a slightly flowery aroma. Now thats what I call par for the course.',
    "style": "Lager",
    "beer_image": "https://images.squarespace-cdn.com/content/v1/581a2d252994ca082120e432/1652459380215-O35Q5ABHSN57C5BXABJN/UpdatedClubHausHero.jpg",
    # "price": 7,
    "abv": 4.7,
    "ibu": 40
  },
  {
    "name": 'Unicorn Dust',
    "brewery_id": 5,
    "description": "It's said that Unicorns had special powers to make water drinkable and we absolutely agree, Unicorn Dust is unconscionably smooth. Brewed with rainbow Mosaic hops giving notes of peach, blueberry, tangerine, and papaya.",
    "style": "IPA",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-1894766_8fda8_hd.jpeg",
    # "price": 7,
    "abv": 7.5,
    "ibu": 60
  },
  {
    "name": 'Bramling X',
    "brewery_id": 6,
    "description": 'Good old Bramling Cross is elegant, refined, assured, (boring) and understated. Understated that is unless you hop the living daylights out of a beer with it. This is Bramling Cross re-invented and re-imagined, and shows just what can be done with English hops if you use enough of them. Poor Bramling Cross normally gets lost in a woeful stream of conformist brown ales made by sleepy cask ale brewers. But not anymore. This beer shows that British hops do have some soul, and is a fruity riot of blackberries, pears, and plums. Reminds me of the bramble, apple and ginger jam my grandmother used to make.',
    "style": "Pale ALe",
    "beer_image": "http://beer.suregork.com/wp-content/uploads/2011/07/brewdog_bramling_x-400x600.jpg",
    # "price": 7,
    "abv": 7.5,
    "ibu": 50
  },
  {
    "name": 'The Glow',
    "brewery_id": 8,
    "description": "Motueka and Citra hops provide a Satsuma zest nose with pleasantly bitter tropical tang and candied apricot on a familiar coastal New Zealand hop flavor undertone. We had to sprinkle The Glow with a little Simcoe and Mosaic for some of that west coast darkness that we love. It's got that Cellarmaker glow!",
    "style": "Pale Ale",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-924656_a6220_hd.jpeg",
    # "price": 7,
    "abv": 7.3,
    "ibu": 55
  },
  {
    "name": 'Works and Days',
    "brewery_id": 8,
    "description": 'A four component Barleywine blend that weaves two parts double oak aged Barleywine (Weller Reserve and Thomas Handy Rye) with a barrel of our first Bourbon aged Munichwine (Heaven Hill) as well as a Bourbon aged Barleywine (Old Fitzgerald) of incredible depth that aged for two years. Salivating aromas of Tawny Port, cherry cordial, Tahitian vanilla, bourbon soaked dates and chinotto. Paralyzing flavors of maple sugar marzipan, creme brulee, fig, cinnamon raisin pumpernickel French toast and bourbon warmth.',
    "style": "Barley Wine",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-4710495_4e9ae_hd.jpeg",
    "price": 7,
    "abv": 5.3,
    "ibu": 30
  },
  {
    "name": 'Dank of the West',
    "brewery_id": 8,
    "description": 'You know we love anything DANK, so when we tried this oily, tangy, ganja-smelling IPA, we had to label it with our first dank pun in years! Strata and Idaho 7 lead the way with bright tropical fruit and sour diesel spice with a touch of Centennial and Simcoe for undertones of citrusy terpenes. Clear and crisp for that West Coast kick that we all love some much!',
    "style": "IPA",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-3673411_b746f_hd.jpeg",
    # "price": 7,
    "abv": 4.5,
    "ibu": 70
  },
  {
    "name": 'Alpha Dog',
    "brewery_id": 15,
    "description": 'A fusion of caramel malt flavours and punchy New Zealand hops. An imperial beer you can get your teeth into.',
    "style": "IPA",
    "beer_image": "https://lh3.googleusercontent.com/UikyE01_YD_0z2H5IXWV_bWaOF9X_Rp94pnMHPL5qGCfrjcuTWf0NxHpSBlxiI59Whws0yNxDe0OgpiDigyMyAr6GiVQrys=s750",
    # "price": 7,
    "abv": 8.5,
    "ibu": 72
  },
  {
    "name": 'ANIMAL',
    "brewery_id": 9,
    "description": 'Animal is an intensely aromatic IPA whose vibrant tropical hop character is grounded by a dry, well-structured malt backbone. The primary flavors of pineapple, citrus and mango—the result of blending Australian Vic Secret, Citra and Simcoe hops—work harmoniously to create an IPA in the Fort Point tradition: an exceptionally bold, well-balanced beer.',
    "style": "IPA",
    "beer_image": "https://fortpointbeer.com/assets/images/beers/Animal/_cans/Thumb_Animal.jpg",
    # "price": 7,
    "abv": 7.5,
    "ibu": 68
  },
  {
    "name": 'Harmonic Kolsch',
    "brewery_id": 10,
    "description": 'Soft grain - subtle and clean.',
    "style": "Kolsch",
    "beer_image": "https://untappd.akamaized.net/photos/2022_03_20/0d56ad7c4511a98df5282b1934da6e75_640x640.jpg",
    # "price": 7,
    "abv": 5.1,
    "ibu": 45
  },
  {
    "name": 'Third Circle',
    "brewery_id": 11,
    "description": 'Bright gold with a rich and full white head. Aromas of cumin and coriander with a slight toasted bread character. Balanced spice notes accompany the dried fruit flavors of pear and grapefruit. Clean and dry finish with a slightly acidic tone. Well balanced Tripel for the any season.',
    "style": "Belgian",
    "beer_image": "https://www.laughingmonkshop.com/uploads/1/3/3/2/133278315/s168931851213007208_p217_i2_w1200.jpeg",
    "price": 7,
    "abv": 9.2,
    "ibu": 40
  },
  {
    "name": 'Air Hugs',
    "brewery_id": 12,
    "description": 'The levels of hops vary throughout the range. We love hops, so all four beers are big, bitter badasses, but by tweaking the amount of each hop used later in the boil and during dry- hopping, we can balance the malty backbone with some unexpected flavours. Simcoe is used in the whirlpool for all four beers, and yet still lends different characters to each',
    "style": "IPA",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos/beer-3742558_96601_sm.jpeg",
    # "price": 7,
    "abv": 6,
    "ibu": 70
  },
  {
    "name": 'Dubs',
    "brewery_id": 13,
    "description": "Magnolia in proud partnership with the Golden State Warriors. A unique combination of German and American hops gives just a swish of aroma to this easy drinking Lager. ",
    "style": "Lager",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-3400647_85dad_hd.jpeg",
    # "price": 7,
    "abv": 8.2,
    "ibu": 70
  },
  {
    "name": 'East Bay IPA',
    "brewery_id": 14,
    "description": 'Bio-energy brewed with hella West Coast hops that result in notes of bright tropical citrus flavor, mellow pine needle aroma and balanced by a bold grain bill for a vibrant malt body that drinks deceptively smooth.',
    "style": "IPA",
    "beer_image": "https://images.squarespace-cdn.com/content/v1/5e508a7cc3edc625cceee952/1619150465459-REDLIJ4I71TBWS6X8NED/01-EBIPA.png",
    # "price": 7,
    "abv": 7.7,
    "ibu": 76
  },
  {
    "name": 'La Nina Fresa',
    "brewery_id": 14,
    "description": 'Ale crafted our house-made Mexican Tepache consisting of cinnamon, brown sugar, ginger, and whole chopped pineapples. Spontaneous fermentation creates a tart ale balanced by funky pineapple and bready cake flavors.',
    "style": "Fruit Beer",
    "beer_image": "https://cdn.shopify.com/s/files/1/1361/4547/files/Website_Beer_Icon_-_La_Nina_Fresa.png",    # "price": 7,
    "abv": 4.3,
    "ibu": 25
  },
  {
    "name": 'After Hours (Chocolate)',
    "brewery_id": 16,
    "description": "Fair trade Ghanaian cocoa nibs give a smooth, rich, lightly floral chocolatey flavor rounded out by just a bit of vanilla. We dare you to try this one over ice cream.",
    "style": "Stout",
    "beer_image": "https://images.squarespace-cdn.com/content/v1/5c16d35a7e3c3a927a76ec36/1639173219603-LA0RPUXM1KI1YR65DJQ5/afterhours-4pack.jpg?format=500w",    # "price": 7,
    "abv": 7.8,
    "ibu": 25
  },
  {
    "name": 'Succubus',
    "brewery_id": 14,
    "description": 'Dark, heavy, and deceptively smooth with a dry finish bursting in notes of roasted barley and black coffee.',
    "style": "Stout",
    "beer_image": "https://images.squarespace-cdn.com/content/v1/5e508a7cc3edc625cceee952/1632282126754-85V3Q3OPO69BBLDZ94WP/succubus-2cans.png",    # "price": 7,
    "abv": 8,
    "ibu": 20
  },
  {
    "name": 'Bubble Chamber',
    "brewery_id": 8,
    "description": 'This is the light beer craft drinkers want to crush. Pleasantly soft citrus & floral orange blossom aromas arise from German Hallertau Mittelfrüh & the dry hop of whole leaf German Hersbrucker hops sourced by Hop Head Farms. The flavor is fresh, clean & vibrant with hints of oolong tea, lilac pollen, honey dipped rye bread and dried lemon peel. Zesty carb & a smooth as silk finish from 4 weeks of cold conditioning.',
    "style": "Pilsner",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-4270683_72406_hd.jpeg",    # "price": 7,
    "abv": 55,
    "ibu": 75
  },
  {
    "name": 'Emerald Eyes',
    "brewery_id": 8,
    "description": 'The world needs more pale ale. You should drink more pale ale. And that’s why we are stoked to rebrew this very new pale, sessionable and aromatic brew. Hopped with a unique and modern combination of Riwaka, Strata and Talus, Emerald Eyes is incredibly soft with aromas of peachy stonefruit, white grape and guava and underlying notes of coastal pine and lime.',
    "style": "Pale Ale",
    "beer_image": "https://untappd.akamaized.net/site/beer_logos_hd/beer-4536900_9d353_hd.jpeg",    # "price": 7,
    "abv": 4.7,
    "ibu": 45
  }
]

# randomImage = fake.image.abstract(200, 200, True)

# print(randomImage)

def seed_beer():
    for beer in beer_list:
        new_beer = Beer(
            name=beer["name"],
            brewery_id=beer["brewery_id"],
            description=beer["description"],
            style=beer["style"],
            # price=beer["price"],
            abv=beer["abv"],
            ibu=beer["ibu"],
            beer_image=beer["beer_image"],
        )
        db.session.add(new_beer)
    db.session.commit()


def undo_beer():
    db.session.execute('TRUNCATE beer RESTART IDENTITY CASCADE;')
    db.session.commit()
