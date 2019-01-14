( document ).ready(function() {
    // An array of food, new food will be pushed into this array;
    var food = ["Popcorn", "Cake", "Popsicles", "Pizza", "Milk", "Corn"];
    // Function that displays all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < food.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("food");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", food[i]);
            gifButton.text(food[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new food button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var newFood = $("#food-input").val().trim();
        if (newFood == ""){
          return false; // added so user cannot add a blank button
        }
        food.push(newFood);
    
        displayGifButtons();
        return false;
        });
    }
  
    function removeLastButton(){
        $("removeGif").on("click", function(){
        newFood.pop(food);
        displayGifButtons();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var food = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=hcZ5LDFepAckCSKBBOds2RUFKvjS9HML";
        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); // console test to make sure something returns
            $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs to go inside
                gifDiv.addClass("gifDiv");
                // pulling rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".food", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });