
// initial array of animals
var animals = ["alligator", "bear", "bee", "bird", "camel", "cat", 
"chicken", "chimpanzee", "cow", "deer", "dog", "dolphin", "duck", 
"eagle", "elephant", "fish", "fly","fox","frog","giraffe","goat",
"goldfish","hamster","hippopotamus","horse","kangaroo","kitten",
"lion","lobster","monkey","octopus","owl","panda","pig","puppy",
"rabbit","rat","scorpion","seal","shark","sheep","snail","snake",
"spider","squirrel","tiger","turtle","wolf","zebra"];

// function for displaying buttons
function renderButtons() {
// clear out section of old buttons
$("#buttons-view").empty();

// loop through array of animals
for (var i=0; i<animals.length; i++){
	// make a button for each animal in array
	var aBtn = $("<button>");
	// give it a class, data, and text
	aBtn.addClass("animal").attr("data-name",animals[i]).text(animals[i]);
	// show the button in the html
	$("#buttons-view").append(aBtn);
}
}

// function handles events when an animal button is clicked
$("#add-animal").on("click", function(event){
// stop the page from reloading on submit
event.preventDefault();
// get the input from the text box
var animal = $("#animal-input").val().trim();

// dont create button if input field is blank
if (animal.length>0){
// add animal from textbox to array
animals.push(animal);

// call the render buttons function so the new btns show
renderButtons();
}
// clear input field upon submit
$("#animal-input").val("");
});

// define function that takes animal and runs api call for gifs
function displayAnimalGIFs(){

	var animalQ = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		animalQ + "&api_key=dc6zaTOxFJmzC&limit=10";

// make my AJAX request
$.ajax({
	url: queryURL,
	method: "GET"
})
// after data comes back from api
.done(function(response){
	// clear out gif space to get rid of old animal gifs
	$("#animal-image-section").empty();

	// taking the results and storing in an array;
	var results = response.data;

	// loop over every result item
	for (var j = 0; j<results.length; j++){
		// only use appropriately rated results
		if (results[j].rating !== "r" && results[j].rating !== "pg-13") {

		// make a div for each image/rating continer - item
		var gifDiv = $("<div class='item'>");
		// store the results rating
		var rating=results[j].rating;

		// make a paragraph tage with the rating in it
		var p = $("<p>").text("Rating: "+rating);

		// create image tag
		var animalImage= $("<img>");
		// give img a class of gif
		animalImage.addClass("gif");
		// give img tag source of the still img url from response
		animalImage.attr("src",results[j].images.fixed_height_still.url);
		// also set state to still so we can swith to animated on click
		animalImage.attr("data-state","still");
		// set still url as attr
		animalImage.attr("data-still",results[j].images.fixed_height_still.url);
		// set animated url as attr
		animalImage.attr("data-animate",results[j].images.fixed_height.url);

		// put the paragraph and picture in the gifdiv
		gifDiv.append(p);
		gifDiv.append(animalImage);

		// put the gif div in the image section of the html
		$("#animal-image-section").prepend(gifDiv);
		}
	}
});
}

// func to animate gifs by toggling state between still and animated
function animateGIFs(){

// make vars for state and urls, just to make it look nice
var state=$(this).attr("data-state");
var animateURL = $(this).attr("data-animate");
var stillURL= $(this).attr("data-still");

if (state=='still'){
$(this).attr("src",animateURL);
$(this).attr("data-state","animate");	
};

if (state=='animate'){
$(this).attr("src",stillURL);
$(this).attr("data-state","still");	
}

};

// add click listener to run API call when animal btn clicked
$(document).on("click",".animal",displayAnimalGIFs);

// add click listener to run API call when animal btn clicked
$(document).on("click",".gif",animateGIFs);

// render btns from the get go so initial ones show
renderButtons();















