# Fully Tappd

Fullytappd is a loose clone of Untappd, a beer reviewing web application. Users can navigate the site viewing a single beer or brewery's page. On their respective pages, users can expect to see recent reviews on that beer/brewery as well as information such as their average rating and number of reviews.

There are two kinds of users: business and standard. A standard user is able to create a profile, view all beers and breweries while navigating the site, and leave a reviews on beers they are currently drinking. In addition to the latter, a business user can also create a brewery and beers associated to that brewery. If a user is not logged in, they only have the ability to view beers and breweries.

This project has been a testament to my pursuit of building upon my previous knowledge. Prior to my enrollment in App Academy, I spent time working in the beer and wine industries. This project proved to be an extension of those passions and I throughly enjoyed building out this application. I look forward to spending more time further developing out additional feature such as user profiles, friends, likes, and badges. I also plan on integrating AWS for image uploads and google maps api to find beer and breweries local to each user.


## Features
- Create an account, sign in, or log in as a standard or business demo user
- Create, view, edit, and delete
   - Breweries
   - Beers
   - Reviews
   - Likes
   - Search
   - Likes
   
Upcoming features: 
- User Profiles
- Friends
- Badges
- Google Maps


## Technologies Used
- Javascript
- React
- Redux 
- Python
- PostgreSQL
- Flask SQLAlchemy
- HTML5
- CSS3


# Splash page
From the splash page, users can to choose to create an account, log into an existing account, or log in as a demo user. It demonstrates a few of the platforms features and a preview of the BrewHub to entice Brewery Owners to sign up and add their brewery to the application.
![image](https://user-images.githubusercontent.com/90273783/171720202-1f0bfec6-38c8-4cc1-97b5-dac4ae68629a.png)
![image](https://user-images.githubusercontent.com/90273783/171720451-7baee5e9-8b33-4a19-88f6-bac1611a17c0.png)


# Breweries
From the Breweries Lists page, users can view all breweries listed on the site. They can hover over and click on a brewery's name to be directed to that brewery's respective profile page. From the single brewery page, users can view some specific information pertaining to that brewery as well as navigate to the beer pages that are offered from that specific brewery. 
![image](https://user-images.githubusercontent.com/90273783/171722343-baf7652a-23a9-433b-8bba-b97793a9bb7a.png)
![image](https://user-images.githubusercontent.com/90273783/171723257-bcb5893a-d709-462a-8d05-4f24db14e640.png)


# Beers
From the Beer List page, users can view all beers listed on the site. They can hover over and click on a beer's name to be directed to to that beer's profile page or they can go directly to page of the brewery that created that beer by clicking on the brewery name. From the single beer page, users can view some specific information pertaining to that beer, reviews on that beer, and similar beers by style and from the same brewery. 
![image](https://user-images.githubusercontent.com/90273783/171723364-9afc5a5f-b0dd-4710-8bd8-029f83793df7.png)
![image](https://user-images.githubusercontent.com/90273783/171723712-f9d8d422-a03b-45af-966e-e1584353f1ef.png)

# Reviews
From the single beer page, users can view all recent reviews on a single beer as well as post their own review if the user is logged in. If the user created a review, edit and delete buttons will appear on that review.
![image](https://user-images.githubusercontent.com/90273783/171723978-0b197942-f0c8-4986-9d4e-fe5cc0a3444c.png)

# Search 
Located on the splashpage and in the navbar when logged in, users will find a search bar where they can search the platfrom for breweries, beer, or beer styles that match their search entry. After hitting enter, the user will be directed to a seach results page where they can view the results for beer and breweries by switching between tabs. On the right hand side, users will find the highest rated beers and breweries. 
![image](https://user-images.githubusercontent.com/90273783/171724479-da1adead-4493-4e36-a1fa-568ccc9d4e39.png)
![image](https://user-images.githubusercontent.com/90273783/171724557-f1ddcd31-cbbf-4fa3-8f92-02d2dce829d6.png)



