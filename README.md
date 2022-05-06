# Fully Tappd

Fullytappd is a loose clone of Untappd, a beer reviewing web application. Users can navigate the site viewing a single beer or brewery's page. On their respective pages, users can expect to see recent reviews on that beer/brewery as well as information such as their average rating and number of reviews.

There are two kinds of users: business and standard. A standard user is able to create a profile, view all beers and breweries while navigating the site, and leave a reviews on beers they are currently drinking. In addition to the latter, a business user can also create a brewery and beers associated to that brewery. If a user is not logged in, they only have the ability to view beers and breweries.

This project has been a testament to my pursuit of building upon my previous knowledge. Prior to my enrollment in App Academy, I spent time working in the beer and wine industries. This project proved to be an extension of those passions and I throughly enjoyed building out this application. I look forward to spending more time and further developing out additional feature such as user profiles, friends, favorites, and badges. I also plan on integrating AWS for image uploads and google maps api to find beer and breweries local to each user.


## Features
- Create an account, sign in, or log in as a standard or business demo user
- Create, view, edit, and delete
   - Breweries
   - Beers
   - Reviews
   - 
Upcoming features: 
- Favorites
- User Profiles
- Friends
- Search 
- Badges
- AWS
- Google Maps


## Technologies Used
- Javascript
- React
- Redux 
- Python
- PostgreSQL
- Flask SQLAlchemy


# Splash page
From the splash page, users can to choose to create an account, log into an existing account, or log in as a demo user. It features a preview of the BreweryHub to entice Brewery Owners to sign up and add their brewery to the application.
![splashpage1](https://user-images.githubusercontent.com/90273783/165002745-1506da0e-af00-4242-b781-4b8206918e43.png)
![splashpage2](https://user-images.githubusercontent.com/90273783/165002758-d1213f7a-66b4-42f6-9bfe-829fd8b48bc2.png)


# Breweries
From the Breweries Lists page, users can view all breweries listed on the site. They can select "Go To Brewery" to be directed to a single  brewery's profile page. From the single brewery page, users can view some specific information pertaining to that brewery as well as navigate to the specific page's of that brewery's beers. 
![brewerylist](https://user-images.githubusercontent.com/90273783/165002868-d7ad197a-c2ac-434d-9aae-780a8c18dbc5.png)
![single-brewery](https://user-images.githubusercontent.com/90273783/165002872-8d95e2c9-cc9a-4e95-94ce-93560c66e66e.png)


# Beers
From the Beer List page, users can view all beers listed on the site. They can select "Go To Beer" to be directed to a single  beer's profile page or they can go directly to page of the brewery that created that beer. From the single beer page, users can view some specific information pertaining to that beer as well as recent reviews on that beer. 
![beerlist](https://user-images.githubusercontent.com/90273783/165002932-a82ea4ce-a626-49af-b148-7c75ad633426.png)
![single-beer](https://user-images.githubusercontent.com/90273783/165002936-ab5876e2-b561-4ec6-8aaf-10001e2222b1.png)

# Reviews
From the single beer page, users can view all recent reviews on a single beer as well as post their own review if the user is logged in. If the user created a review, edit and delete buttons will appear on that review.
![reviews](https://user-images.githubusercontent.com/90273783/165003017-a92ff4f3-8e8f-4a40-88cf-0fa452cc5f80.png)
