# Project-1 Market Finder 
# User Story
```
AS A person interested in supporting local farmers and making healthy food 
I WANT to see a list farmers markets in my area along with recipes I can make using the produce they sell
SO THAT I can attend them and support my local community while eating healthy
```
# Usage
Upon the webpage loading, users will see an a sidebar asking for a zip code input. Once they submit a zip code a list of farmer's markets will appear on the right side of the page. Each farmer's market within the list will contain AN ADDRESS, ITEMS SOLD THERE, AND A NAME FOR THE MARKET. 

# Functionality
The two inputs within the side bar were created using input elements with buttons. The information entered into the zip code input space is accessed in the javascript and passed into the getResults function as a parameter. It is the added to the end of the api url in order to access an array of markets for that zip code. 

```javascript
searchBtn.on("click", function() {
    var zip = $("#zip-in").val();
    console.log(zip);
    
    addMarketCards();

    getResults(zip);
    //getRecipe();
});
```
Listed above is the event listener for the click on the search button under the zip code input. It accesses the value entered and then runs the getResults function with it. 

The getResults function contains this fetch call

```javascript
 fetch("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            marketNames = data;
            for (var i = 0; i < data.results.length; i++) {
                id[i] = data.results[i].id;
                getDetails(id[i], i);
            }
            console.log(details);
            return marketNames;
            return details;
    });
```

CLARIFY WHAT THE FOR LOOP DOES

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

# Live Link and Screenshot
https://abaxley2.github.io/Project-1/

![Market Finder Image](https://abaxley2.github.io/Project-1/Assets/images/MarketFinder.png)

# Contributions
The following links are the APIs used in this page

Farmer's Market API - USDA
https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html

Recipe API
https://spoonacular.com/food-api

This is the link used to create the logo
https://www.freelogodesign.org/
