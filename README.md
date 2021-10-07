# Project-1 Market Finder 
# User Story
```
AS A person interested in supporting local farmers and making healthy food 
I WANT to see a list farmers markets in my area along with recipes I can make using the produce they sell
SO THAT I can attend them and support my local community while eating healthy
```
# Usage
Upon the webpage loading, users will see an a sidebar asking for a zip code input. Once they submit a zip code a list of farmer's markets will appear on the right side of the page. Each farmer's market within the list will contain AN ADDRESS, ITEMS SOLD THERE, AND A NAME FOR THE MARKET. 

# Tailwind
Tailwind was the chosen css library for styling this page. Classes were added within the HTML file changing the layout and colors of desired elements. 

# Functionality
The two inputs within the side bar were created using input elements with buttons. The information entered into the zip code input space is accessed in the javascript and passed into the getResults function as a parameter. It is the added to the end of the api url in order to access an array of markets for that zip code. 

```javascript
searchBtn.on("click", function() {
    marketNames = [];
    details = [];
    id = [];
    var zip = $("#zip-in").val();
    console.log(zip);

    backgroundImg.addClass("hide");
    cardContainer.removeClass("hide");
    
    getResults(zip);
    $('#food-in').removeClass("hide");
});
```
Listed above is the event listener for the click on the search button under the zip code input. It accesses the value entered and then runs the getResults function with it. 

The getResults function contains this fetch call

```javascript
 fetch("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            marketNames = data;
            for (var i = 0; i < data.results.length; i++) {
                id.push(data.results[i].id);
                //console.log("id: " + id);
                
            }
            getDetails(id);
            console.log(details);
            console.log(details.length);
            // addMarketCards();
            // return marketNames;
            return details;
        })
        .then(function (details) {
            console.log(details.length);
            setTimeout(function(){ addMarketCards(); }, 200);
        })
```

This is getting the values for the entered zip by the user. A timer was added to allow for enough time for the information to be gathered before populating the page. 

The getDetails function is then run using the id for each market along with the number it is the array. The getDetails function contains an additional API call gathering details for each of the listed markets. 

```javascript
 fetch("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            details[i] = data.marketdetails;
            //console.log(details);
            return details;
    });
```

The addMarketCards function is also called in the event listener for the submit button. This is the function where the cards are added to the page. It contains a for loop that runs for each market returned and fills the card with the coinciding information.

```javascript
  for (i = 0; i < details.length; i++) {
        cardTitle = marketNames.results[i].marketname;
        marketCardContainer.append("<div>"); // append new div in cardcontainer
        marketCardContainer.children().eq(i).addClass("card-box"); // add box class to div
        marketCardContainer.children().eq(i).append("<div class='card-title'><h2></h2></div>"); // append content elements within this new div
        marketCardContainer.children().eq(i).children().eq(0).children().first().text(cardTitle);

        marketCardContainer.children().eq(i).append("<div class='card-link'><h3></h3></div>");
        marketCardContainer.children().eq(i).children().eq(1).children().first().text(link);

        marketCardContainer.children().eq(i).append("<div class='card-reviews'><h3></h3></div>");
        marketCardContainer.children().eq(i).children().eq(2).children().first().text(reviews);

        marketCardContainer.children().eq(i).append("<div class='card-phone'><h4></h4></div>");
        marketCardContainer.children().eq(i).children().eq(3).children().first().text(phone);
    }

```
In order for the recipe search to work an additional event listener was added to the javascript. 

```javascript
recipeButton.on("click", function() {
    ingredient = $("#recipe-in").val();
    console.log(ingredient);

    backgroundImg.addClass("hide");
    cardContainer.removeClass("hide");
    
    getRecipe(ingredient);
})
```
This changes what is shown on the page through adding and removing the hide class which is display: none in style.css. It also runs the getRecipe function which contains the fetch call for the second API. 


```javascript
  fetch("https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + recipeKey + "&ingredients=" + ingredient)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data);
            recipes = data;
            return recipes;
        })
        .then(function () {
            addRecipeCards();
        });
```

The addRecipeCards function is then called and the recipe cards are populated with images and recipe titles 

```javascript
   var recipeTitle;
    var imgLink;
    cardContainer.empty();

    for (i = 0; i < recipes.length; i++) {
        recipeTitle = recipes[i].title;
        cardContainer.append("<div>"); // append new div in cardcontainer
        console.log('divappend');
        cardContainer.children().eq(i).addClass("card-box"); // add box class to div
        cardContainer.children().eq(i).append("<div class='card-title'><h2></h2></div>"); // append content elements within this new div
        cardContainer.children().eq(i).children().eq(0).children().first().text(recipeTitle);

        imgLink = recipes[i].image;
        cardContainer.children().eq(i).append("<div class='card-img'><img src='" + imgLink + "' </img></div>");
    }
```

There is also an email and password log in where users information is saved into local storage upon a click of the log in button. This will allow future development to be added. 
# Live Link and Screenshot
https://ebadrehman92.github.io/Market-Finder/

<img width="1420" alt="marketFinder" src="https://user-images.githubusercontent.com/64440230/136472703-8ef1cd37-b941-4cf4-bfbb-32d1f9d4a584.png">

# Contributions
The following links are the APIs used in this page

Farmer's Market API - USDA
https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html

Recipe API
https://spoonacular.com/food-api

This is the link used to create the logo
https://www.freelogodesign.org/
