//cerate an array of the topics for each button

var topics = ["shrug", "pout", "confused", "excited"];
//function to display all gif buttons

function displayButtons() {
  // Deleting the buttons prior to adding new buttons
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each topic in the array
    var gifButton = $("<button>");
    // Adding a class
    gifButton.addClass("gif");
    // Added a data-attribute
    gifButton.attr("data-name", topics[i]);
    // Provided the initial button text
    gifButton.text(topics[i]);
    // Added the button to the HTML
    $("#buttons-view").append(gifButton);
    // console.log(gifButton);
  }
}
displayButtons();
//create an on click event to add gif
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  //create a variable for user input of new gif
  var newGif = $("#gif-input")
    .val()
    .trim();
  //user input is added to the array
  topics.push(newGif);
  //call the display displayButton
  displayButtons();
});
//function to display giphys on clikcing the Gif Button
$(document).on("click", "button", function() {
  //grabbing the data-name attribute and storing it in the gifbutton
  var gifButton = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gifButton +
    "&api_key=SbMcpktYF3fStJ6nmvWXH3xc7X0jRSv4&limit=10";
  //ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    //after response comes from ajax
    .then(function(response) {
      console.log(queryURL);
      console.log(response);
      //
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var topicDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var topicImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        //storing urls in variables called data-still and data-animate
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        topicImage.attr("data-animate", results[i].images.fixed_height.url);
        topicImage.attr("data-state", "still");

        // Appending the paragraph and image tag to the topicDiv
        topicDiv.append(p);
        topicDiv.append(topicImage);
        $("#gifs-appear-here").prepend(topicDiv);
      }
    });
});
//create a function for animatestill
$(document).on("click", "img", function() {
  var dataState = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (dataState === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
