zip = 77024;
var id = [];
var details = [];
var ingredients = "broccoli"
var recipeKey = "ed84eec3dc524169bf8954cb1aa495ef";
var ingredients = "broccoli";

function getResults(zip) {
    fetch("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (var i = 0; i < data.results.length; i++) {
                id[i] = data.results[i].id;
                getDetails(id[i], i);
            }
            console.log(details);
            return details;
    });
}

function getDetails(id, i) {
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

getRecipe();
getResults(zip);