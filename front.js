// function getDrinkInfo(search) {
let $displayArea = $(".card-container")

$(document).ready(function(){
    // Using main search button on click to run main function
    $( "#btn" ).click(function() {     
        getDrinkInfo($("#search-text").val())
    });

    // Using main search bar on enter to be able to search. 
    $('input').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        //if statement for enter button on keyboard
        if(keycode == '13'){
            getDrinkInfo($("#search-text").val())
        }     
    });
    // Using random button for extra fun!
    $( "#btnR" ).click(function() {     
        getRandomDrink()
    });
});


function fetchIngredientsAndMeasures(drink) {
    const ingredientRaw = [];
    const measureRaw = [];

    // Loop through the drink object to fetch ingredients and measures
    for (let i = 1; i <= 10; i++) {
        if (drink[`strIngredient${i}`]) {
            ingredientRaw.push(drink[`strIngredient${i}`]);
        }
        if (drink[`strMeasure${i}`]) {
            measureRaw.push(drink[`strMeasure${i}`]);
        }
    }
    // Remove undefined values
    const ingredient = ingredientRaw.filter(x => x);
    const measure = measureRaw.filter(x => x);

    return { ingredient, measure };
}


// Main function for search for drinks via typing in the search bar
function getDrinkInfo(search) {
$.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search, (data) => {

    // empty out the container. This will dump all cards and keep our container
    $(".card-container").empty()

    if (data.drinks == null) {
        let $pic = $('<img></img>').addClass("error")
        $pic.attr('src', 'https://blog.expertrec.com/wp-content/uploads/2021/01/no-result-found-1200x675.jpg')
        $(".card-container").append($pic)
        return console.log('no results 😢') 
    }
    
    for (let i = 0; i < data.drinks.length; i++) {
        let drinkTitle = data.drinks[i].strDrink 
        let drinkPicture = data.drinks[i].strDrinkThumb
        var instructions = data.drinks[i].strInstructions
        const { ingredient, measure } = fetchIngredientsAndMeasures(data.drinks[i]);
        pushToPage(drinkTitle, drinkPicture, ingredient, measure, instructions)
    }

});

}

// Random button function!
function getRandomDrink() {
    $.get("https://www.thecocktaildb.com/api/json/v1/1/random.php", (data) => {
        console.log(data.drinks);
        $(".card-container").empty()

            let drinkTitle = data.drinks[0].strDrink 
            let drinkPicture = data.drinks[0].strDrinkThumb
            let instructions = data.drinks[0].strInstructions
            const { ingredient, measure } = fetchIngredientsAndMeasures(data.drinks[0]);
            pushToPage(drinkTitle, drinkPicture, ingredient, measure, instructions)

    });
    
}

// function that pushes onto the page itself
function pushToPage(drinkTitle, drinkPicture, ingredient, measure, instructions) {

    // developing a card for each item
    let $cardAdd = $('<div></div>');
    $cardAdd.addClass("card")

    //  name for each item
    let $h2 = $('<h2></h2>').addClass("drink-name");
    $h2.text(drinkTitle);
    $cardAdd.append($h2)

    // pic for each item. Class will adjust size of picture
    let $pic = $('<img></img>').addClass("drink-picture")
    $pic.attr('src', drinkPicture)
    $cardAdd.append($pic)


    // Some ingredients don't have a corressponding measures. If there is no measure it only appends ingredient text with no measurement.
    var i = 0
    while( i < ingredient.length) {
        let $ingredient = $('<div></div>')
        $ingredient.addClass("drink-ingredients")
        if (measure[i] !== undefined) {
            $ingredient.text(measure[i] + '   ' + ingredient[i])
            $cardAdd.append($ingredient)
        } else {
            $ingredient.text(ingredient[i])
            $cardAdd.append($ingredient)
        }
        i++
    }

    // Paragraph append
    let $instructions = $('<p></p>')
    $instructions.text(instructions)
    $instructions.addClass("instructions")
    $cardAdd.append($instructions)

    // Adding card with all appended items into the main container
    $('.card-container').append($cardAdd)

}


