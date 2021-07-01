var id = [];
var details = [];
var marketNames = [];
var ingredient = "broccoli"
var recipeKey = "ed84eec3dc524169bf8954cb1aa495ef";
var ingredients = "broccoli";
var searchBtn = $('#search-btn');
var cardContainer = $(".card-container"); // update with whatever html the market cards are made of
var backgroundImg = $(".backgroundImg");

var recipeButton = $("#recipe-btn");
var rememberMe = document.querySelector(".block mt-2"); // update with local storage
var userInfo = document.querySelector("#userName");
var userPassword = document.querySelector("#myPassword");
var saveInfo = document.querySelector("#login-btn")


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
}

function addRecipeCards () {
    console.log("adding cards");
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
}

function addMarketCards () {
    console.log("adding cards");
    var cardTitle;
    var address;
    var products;
    var hours;
    cardContainer.empty();

    for (i = 0; i < details.length; i++) {
        cardTitle = marketNames.results[i].marketname;
        cardContainer.append("<div>"); // append new div in cardcontainer
        console.log('divappend');
        cardContainer.children().eq(i).addClass("card-box"); // add box class to div
        cardContainer.children().eq(i).append("<div class='card-title'><h2></h2></div>"); // append content elements within this new div
        cardContainer.children().eq(i).children().eq(0).children().first().text(cardTitle);

        address = details[i].Address;
        cardContainer.children().eq(i).append("<div class='card-address'><h3></h3></div>");
        cardContainer.children().eq(i).children().eq(1).children().first().text(address);

        products = details[i].Products;
        cardContainer.children().eq(i).append("<div class='card-products'><h3></h3></div>");
        cardContainer.children().eq(i).children().eq(2).children().first().text(products);

        hours = details[i].Schedule;
        hours = hours.substring(0, hours.length-16);
        cardContainer.children().eq(i).append("<div class='card-hours'><h4></h4></div>");
        cardContainer.children().eq(i).children().eq(3).children().first().text(hours);
    }
}

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

recipeButton.on("click", function() {
    var ingredient = $("#zip-in").val();
    console.log(ingredient);

    backgroundImg.addClass("hide");
    cardContainer.removeClass("hide");
    
    getRecipe(ingredient);
})

saveInfo.addEventListener('click', function() {
    localStorage.setItem('email', userInfo.value);

    nameDisplayCheck();
})

saveInfo.addEventListener('click', function() {
    localStorage.setItem('password', userPassword.value);

    nameDisplayCheck();
});

function nameDisplayCheck() {
    if (localStorage.getItem('email')) {
        let name = localStorage.getItem('email');
    }
}

function nameDisplayCheck() {
    if (localStorage.getItem('password')) {
        let password = localStorage.getItem('password');
    }
}