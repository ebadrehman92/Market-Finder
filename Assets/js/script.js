var id = [];
var details = [];
var marketNames = [];
var ingredients = "broccoli"
var recipeKey = "ed84eec3dc524169bf8954cb1aa495ef";
var ingredients = "broccoli";
var searchBtn = $('#search-btn');
var marketCardContainer = $(".card-container"); // update with whatever html the market cards are made of
var backgroundImg = $(".backgroundImg");


function getResults(zip) {
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
}

function getDetails(id) {
    console.log("Do I get the id array" + id);
    for (var i = 0; i < id.length; i++) {
       fetch("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id[i])
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log(data);
                details.push(data.marketdetails);
                //console.log(details);
                return details;
        });
    }
    
}

function getRecipe() {
    fetch("https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + recipeKey + "&ingredients=" + ingredients)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })
}

function addMarketCards () {
    console.log("adding cards");
    var cardTitle;
    var address;
    var products;
    var hours;
    marketCardContainer.empty();

    for (i = 0; i < details.length; i++) {
        cardTitle = marketNames.results[i].marketname;
        marketCardContainer.append("<div>"); // append new div in cardcontainer
        console.log('divappend');
        marketCardContainer.children().eq(i).addClass("card-box"); // add box class to div
        marketCardContainer.children().eq(i).append("<div class='card-title'><h2></h2></div>"); // append content elements within this new div
        marketCardContainer.children().eq(i).children().eq(0).children().first().text(cardTitle);

        address = details[i].Address;
        marketCardContainer.children().eq(i).append("<div class='card-address'><h3></h3></div>");
        marketCardContainer.children().eq(i).children().eq(1).children().first().text(address);

        products = details[i].Products;
        marketCardContainer.children().eq(i).append("<div class='card-products'><h3></h3></div>");
        marketCardContainer.children().eq(i).children().eq(2).children().first().text(products);

        hours = details[i].Schedule;
        hours = hours.substring(0, hours.length-16);
        marketCardContainer.children().eq(i).append("<div class='card-hours'><h4></h4></div>");
        marketCardContainer.children().eq(i).children().eq(3).children().first().text(hours);

    }
}

searchBtn.on("click", function() {
    marketNames = [];
    details = [];
    id = [];
    var zip = $("#zip-in").val();
    console.log(zip);

    backgroundImg.addClass("hide");
    marketCardContainer.removeClass("hide");
    
    getResults(zip);
    
});

// recipeButton.on("click", function() {
//     getRecipe();
// })