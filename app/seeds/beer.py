from random import randint
from app.models import db, Beer
from faker import Faker
fake = Faker()

beer_choices = [
    "Altbier", "Amber Ale", "Barley Wine", "Berliner Weisse", "Blonde Ale", "Bock", "Brown Ale", "Cream Ale", "Dopplebock",
    "Doppelbock", "English Bitter", "English Mild", "Gose", "Gueze", "Hefeweizen", "Helles Bock", "India Pale Ale", "Kolsch",
    "Lager", "Lambic", "Oktoberfestbier", "Pale Ale", "Pilsner", "Porter", "Red Ale", "Saison", "Stout", "Witbier",
]

# print(len(beer_choices))

beer_list = [
  {
    "name": 'Buzz',
    "brewery_id": 20,
    "description": 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.5,
    "ibu": 60
  },
  {
    "name": 'Pale Intoxication',
    "brewery_id": 2,
    "description": 'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.1,
    "ibu": 41.5
  },
  {
    "name": 'Berliner Weisse With Yuzu - B-Sides',
    "brewery_id": 1,
    "description": 'Japanese citrus fruit intensifies the sour nature of this German classic.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.2,
    "ibu": 8
  },
  {
    "name": 'Pilsen Lager',
    "brewery_id": 8,
    "description": 'Our Unleash the Yeast series was an epic experiment into the differences in aroma and flavour provided by switching up your yeast. We brewed up a wort with a light caramel note and some toasty biscuit flavour, and hopped it with Amarillo and Centennial for a citrusy bitterness. Everything else is down to the yeast. Pilsner yeast ferments with no fruity esters or spicy phenols, although it can add a hint of butterscotch.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 6.3,
    "ibu": 55
  },
  {
    "name": 'Avery Brown Dredge',
    "brewery_id": 2,
    "description": 'An Imperial Pilsner in collaboration with beer writers. Tradition. Homage. Revolution. We wanted to showcase the awesome backbone of the Czech brewing tradition, the noble Saaz hop, and also tip our hats to the modern beers that rock our world, and the people who make them.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 7.2,
    "ibu": 59
  },
  {
    "name": 'Electric India',
    "brewery_id": 2,
    "description": 'Re-brewed as a spring seasonal, this beer – which appeared originally as an Equity Punk shareholder creation – retains its trademark spicy, fruity edge. A perfect blend of Belgian Saison and US IPA, crushed peppercorns and heather honey are also added to produce a genuinely unique beer.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 5.2,
    "ibu": 38
  },
  {
    "name": 'AB:12',
    "brewery_id": 3,
    "description": 'An Imperial Black Belgian Ale aged in old Invergordon Scotch whisky barrels with mountains of raspberries, tayberries and blackberries in each cask. Decadent but light and dry, this beer would make a fantastic base for ageing on pretty much any dark fruit - we used raspberries, tayberries and blackberries beause they were local.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 11.2,
    "ibu": 35
  },
  {
    "name": 'Fake Lager',
    "brewery_id": 4,
    "description": 'Fake is the new black. Fake is where it is at. Fake Art, fake brands, fake breasts, and fake lager. We want to play our part in the ugly fallout from the Lager Dream. Say hello to Fake Lager – a zesty, floral 21st century faux masterpiece with added BrewDog bitterness.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.7,
    "ibu": 40
  },
  {
    "name": 'AB:07',
    "brewery_id": 5,
    "description": 'Whisky cask-aged imperial scotch ale. Beer perfect for when the rain is coming sideways. Liquorice, plum and raisin temper the warming alcohol, producing a beer capable of holding back the Scottish chill.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 12.5,
    "ibu": 30
  },
  {
    "name": 'Bramling X',
    "brewery_id": 6,
    "description": 'Good old Bramling Cross is elegant, refined, assured, (boring) and understated. Understated that is unless you hop the living daylights out of a beer with it. This is Bramling Cross re-invented and re-imagined, and shows just what can be done with English hops if you use enough of them. Poor Bramling Cross normally gets lost in a woeful stream of conformist brown ales made by sleepy cask ale brewers. But not anymore. This beer shows that British hops do have some soul, and is a fruity riot of blackberries, pears, and plums. Reminds me of the bramble, apple and ginger jam my grandmother used to make.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 7.5,
    "ibu": 75
  },
  {
    "name": 'Misspent Youth',
    "brewery_id": 8,
    "description": 'The brainchild of our small batch brewer, George Woods. A dangerously drinkable milk sugar- infused Scotch Ale.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 7.3,
    "ibu": 30
  },
  {
    "name": 'Arcade Nation',
    "brewery_id": 7,
    "description": 'Running the knife-edge between an India Pale Ale and a Stout, this particular style is one we truly love. Black IPAs are a great showcase for the skill of our brew team, balancing so many complex and twisting flavours in the same moment. The citrus, mango and pine from the hops – three of our all-time favourites – play off against the roasty dryness from the malt bill at each and every turn.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 5.3,
    "ibu": 60
  },
  {
    "name": 'Movember',
    "brewery_id": 8,
    "description": 'A deliciously robust, black malted beer with a decadent dark, dry cocoa flavour that provides an enticing backdrop to the Cascade hops.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.5,
    "ibu": 50
  },
  {
    "name": 'Alpha Dog',
    "brewery_id": 15,
    "description": 'A fusion of caramel malt flavours and punchy New Zealand hops. A session beer you can get your teeth into.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.5,
    "ibu": 42
  },
  {
    "name": 'Mixtape 8',
    "brewery_id": 9,
    "description": 'This recipe is for the Belgian Tripel base. A blend of two huge oak aged beers – half a hopped up Belgian Tripel, and half a Triple India Pale Ale. Both aged in single grain whisky barrels for two years and blended, each beer brings its own character to the mix. The Belgian Tripel comes loaded with complex spicy, fruity esters, and punchy citrus hop character.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 14.5,
    "ibu": 50
  },
  {
    "name": 'Libertine Porter',
    "brewery_id": 10,
    "description": 'An avalanche of cross-continental hop varieties give this porter a complex spicy, resinous and citrusy aroma, with a huge malt bill providing a complex roasty counterpoint. Digging deeper into the flavour draws out cinder toffee, bitter chocolate and hints of woodsmoke.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 6.1,
    "ibu": 45
  },
  {
    "name": 'AB:06',
    "brewery_id": 11,
    "description": 'Our sixth Abstrakt, this imperial black IPA combined dark malts with a monumental triple dry-hop, using an all-star team of some of our favourite American hops. Roasty and resinous.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 11.2,
    "ibu": 150
  },
  {
    "name": 'Russian Doll – India Pale Ale',
    "brewery_id": 12,
    "description": 'The levels of hops vary throughout the range. We love hops, so all four beers are big, bitter badasses, but by tweaking the amount of each hop used later in the boil and during dry- hopping, we can balance the malty backbone with some unexpected flavours. Simcoe is used in the whirlpool for all four beers, and yet still lends different characters to each',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 6,
    "ibu": 70
  },
  {
    "name": 'Hello My Name Is Mette-Marit',
    "brewery_id": 13,
    "description": "We sent this beer to Norway where it was known as 'Hello, my name is Censored’. You can make up your own mind as to why. This brew was a red berry explosion, with a reisnous bitter edge layered with dry berry tartness.",
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 8.2,
    "ibu": 70
  },
  {
    "name": 'Rabiator',
    "brewery_id": 14,
    "description": 'Imperial Wheat beer / Weizenbock brewed by a homesick German in leather trousers. Think banana bread, bubble gum and David Hasselhoff.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 10.27,
    "ibu": 26
  },
  {
    "name": 'Vice Bier',
    "brewery_id": 20,
    "description": 'Our take on the classic German Kristallweizen. A clear German wheat beer, layers of bubblegum and vanilla perfectly balanced with the American and New Zealand hops.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 4.3,
    "ibu": 25
  },
  {
    "name": 'Devine Rebel (w/ Mikkeller)',
    "brewery_id": 16,
    "description": "Two of Europe's most experimental, boundary-pushing brewers, BrewDog and Mikkeller, combined forces to produce a rebellious beer that combined their respective talents and brewing skills. The 12.5% Barley Wine fermented well, and the champagne yeast drew it ever closer to 12.5%. The beer was brewed with a single hop variety and was going to be partially aged in oak casks.",
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 12.5,
    "ibu": 100
  },
  {
    "name": 'Storm',
    "brewery_id": 17,
    "description": 'Dark and powerful Islay magic infuses this tropical sensation of an IPA. Using the original Punk IPA as a base, we boosted the ABV to 8% giving it some extra backbone to stand up to the peated smoke imported directly from Islay.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 8,
    "ibu": 60
  },
  {
    "name": 'The End Of History',
    "brewery_id": 8,
    "description": 'The End of History: The name derives from the famous work of philosopher Francis Fukuyama, this is to beer what democracy is to history. Complexity defined. Floral, grapefruit, caramel and cloves are intensified by boozy heat.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
    "abv": 55,
    "ibu": 75
  },
  {
    "name": 'Bad Pixie',
    "brewery_id": 8,
    "description": '2008 Prototype beer, a 4.7% wheat ale with crushed juniper berries and citrus peel.',
    "style": beer_choices[randint(0, 27)],
    "price": 7,
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
            price=beer["price"],
            abv=beer["abv"],
            ibu=beer["ibu"],
            # beer_image=randomImage
        )
        db.session.add(new_beer)
    db.session.commit()


def undo_beer():
    db.session.execute('TRUNCATE beer RESTART IDENTITY CASCADE;')
    db.session.commit()
