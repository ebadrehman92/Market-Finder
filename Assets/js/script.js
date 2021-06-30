var id = [];
var details = [];
var marketNames = [];
var ingredients = "broccoli"
var recipeKey = "ed84eec3dc524169bf8954cb1aa495ef";
var ingredients = "broccoli";
var searchBtn = $('#search-btn');
var marketCardContainer = $(".card-container"); // update with whatever html the market cards are made of
var backgroundImg = $(".backgroundImg");
var rememberMe = document.querySelector(".block mt-2"); // update with local storage
var userInfo = document.querySelector("#userName");
var userPassword = document.querySelector("#myPassword");
var saveInfo = document.querySelector("#login-btn")

function getResults(zip) {
    fetch("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip)
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
}

function getDetails(id, i) {
    fetch("https://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            details[i] = data.marketdetails;
            //console.log(details);
            return details;
    });
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
    var cardTitle;
    var link;
    var reviews;
    var phone;

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
}

searchBtn.on("click", function() {
    var zip = $("#zip-in").val();
    console.log(zip);

    marketCardContainer.removeClass("hide");
    backgroundImg.addClass("hide");
    
    addMarketCards();

    getResults(zip);

    //getRecipe();
});

// adding event listener, saving it to local storage

// // rememberMe.addEventListener('button', function(e) {
// //     e.preventDefault();
// })

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