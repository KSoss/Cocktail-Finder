
// function getDrinkInfo(search) {
let $displayArea = $(".card-container")
let search = 'rum'

$(document).ready(function(){
    $( "#btn" ).click(function() {     
        console.log( ".click called." );
        getDrinkInfo($("#search-text").val())
    });
})

$(document).ready(function(){
    $('input').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            getDrinkInfo($("#search-text").val())
        }
      
      });
})

function getDrinkInfo(search) {
$.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search, (data) => {

    $(".card-container").empty()

    if (data.drinks == null) {
        let $pic = $('<img></img>').addClass("error")
        $pic.attr('src', 'https://blog.expertrec.com/wp-content/uploads/2021/01/no-result-found-1200x675.jpg')
        $(".card-container").append($pic)
        return console.log('no results :(')
    }

    for (let i = 0; i < data.drinks.length; i++) {
        let drinkTitle = data.drinks[i].strDrink 
        let drinkPicture = data.drinks[i].strDrinkThumb
        

        var ingredientRaw = [data.drinks[i].strIngredient1,data.drinks[i].strIngredient2,data.drinks[i].strIngredient3,data.drinks[i].strIngredient4,data.drinks[i].strIngredient5,data.drinks[i].strIngredient6,data.drinks[i].strIngredient7,data.drinks[i].strIngredient8,data.drinks[i].strIngredient9,data.drinks[i].strIngredient10]
        var measureRaw = [data.drinks[i].strMeasure1,data.drinks[i].strMeasure2,data.drinks[i].strMeasure3,data.drinks[i].strMeasure4,data.drinks[i].strMeasure5,data.drinks[i].strMeasure6,data.drinks[i].strMeasure7,data.drinks[i].strMeasure8,data.drinks[i].strMeasure9,data.drinks[i].strMeasure10]
        
        ingredient = ingredientRaw.filter(x => x)
        measure = measureRaw.filter(x => x)

        var instructions = data.drinks[i].strInstructions

        pushToPage(drinkTitle, drinkPicture, ingredient, measure, instructions)
    }

});

}


function pushToPage(drinkTitle, drinkPicture, ingredient, measure, instructions) {


    let $cardAdd = $('<div></div>');
    $cardAdd.addClass("card")



    let $h2 = $('<h2></h2>').addClass("drink-name");
    $h2.text(drinkTitle);
    $cardAdd.append($h2)

    let $pic = $('<img></img>').addClass("drink-picture")
    $pic.attr('src', drinkPicture)
    $cardAdd.append($pic)


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

    let $instructions = $('<p></p>')
    $instructions.text(instructions)
    $instructions.addClass("instructions")
    $cardAdd.append($instructions)

    $('.card-container').append($cardAdd)

}

$(document).ready(function(){
    $( "#btnR" ).click(function() {     
        console.log( ".click called." );
        getRandomDrink()
    });
})

function getRandomDrink() {
    $.get("https://www.thecocktaildb.com/api/json/v1/1/random.php", (data) => {
        console.log(data.drinks);
        $(".card-container").empty()
    

            let drinkTitle = data.drinks[0].strDrink 
            let drinkPicture = data.drinks[0].strDrinkThumb
            
    
            var ingredientRaw = [data.drinks[0].strIngredient1,data.drinks[0].strIngredient2,data.drinks[0].strIngredient3,data.drinks[0].strIngredient4,data.drinks[0].strIngredient5,data.drinks[0].strIngredient6,data.drinks[0].strIngredient7,data.drinks[0].strIngredient8,data.drinks[0].strIngredient9,data.drinks[0].strIngredient10]
            var measureRaw = [data.drinks[0].strMeasure1,data.drinks[0].strMeasure2,data.drinks[0].strMeasure3,data.drinks[0].strMeasure4,data.drinks[0].strMeasure5,data.drinks[0].strMeasure6,data.drinks[0].strMeasure7,data.drinks[0].strMeasure8,data.drinks[0].strMeasure9,data.drinks[0].strMeasure10]
            
            ingredient = ingredientRaw.filter(x => x)
            measure = measureRaw.filter(x => x)
    
            var instructions = data.drinks[0].strInstructions
    
            pushToPage(drinkTitle, drinkPicture, ingredient, measure, instructions)
    
    
    
    });
    
}

// }
// var search;





// let searchDrink = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita' + search

// let searchIngredient = 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin' + search

// // var results = JSON.parse(data)

// fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
//     .then(res => console.log(res))

