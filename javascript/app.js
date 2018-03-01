//cerate an array of the topics for each button

// $(document).ready(function() {
var topics = ["shrug", "pout", "confused", "excited"];
//function to display all gif buttons

function displayButtons() {
  // Deleting the buttons prior to adding new buttons
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each topic in the array
    var g = $("<button>");
    // Adding a class
    g.addClass("gif");
    // Added a data-attribute
    g.attr("data-name", topics[i]);
    // Provided the initial button text
    g.text(topics[i]);
    // Added the button to the HTML
    $("#buttons-view").append(g);
    console.log(g);
  }
}

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
$("g").on("click", function() {
  //grabbing the data-name attribute and storing it in the gifbutton
  var gifButton = $(this).attr("data-name");
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    gifButton +
    "&api_key=YSbMcpktYF3fStJ6nmvWXH3xc7X0jRSv4&limit=10";
  $.ajax({
    url: queryUrl,
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
        var topicsDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var topicImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        //

        // Appending the paragraph and image tag to the animalDiv
        topcDiv.append(p);
        topicDiv.append(topicImage);
        $("#gifs-appear-here").prepend(topicDiv);
      }
    });
});
//create a function for animatestill
