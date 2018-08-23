document.addEventListener("DOMContentLoaded", function(e) {
  var starwarsList = ["Leia", "Luke", "Chewbacca"];

  var movie = " star wars";
  var display = document.getElementById(".container");

  function renderButtons(starwarsList) {
    $("#buttons").empty();
    // Looping throgh the array
    for (var i = 0; i < starwarsList.length; i++) {
      var a = $("<button>");
      a.addClass("movie-char");
      a.attr("data-name", starwarsList[i]);
      a.text(starwarsList[i]);
      //  buttons.setAttribute('data-type', starwars);
      $("#buttons").append(a);
      //display.append(button);
      console.log(starwarsList[i]);
    }
  }

  function displayMovieInfo() {
    $("#gifContainer").empty();
    var movie1 = $(this).attr("data-name");
    var queryUrl =
      "https://api.giphy.com/v1/gifs/search?q=" +
      movie1 +
      movie +
      "&api_key=YJvQgvHrxAVUmun9MUVGZSJNPOciKpyI&limit=10&rating=G";
    console.log("queryurl = ", queryUrl);
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      for (var i = 0; i < 10; i++) {
        var rating = response.data[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var imgURLanimated = response.data[i].images.fixed_width.url;
        var imgURLstill = response.data[i].images.fixed_width_still.url;
        var image = $("<img>").attr("src", imgURLstill);
        image.attr("data-state", "still");
        image.attr("data-still", imgURLstill);
        image.attr("data-animate", imgURLanimated);
        image.addClass("gif");
        var emptydiv = $("<div>");
        emptydiv.append(p);
        emptydiv.append(image);
        emptydiv.addClass("extra");
        $("#gifContainer").append(emptydiv);
      }
    });
  }

  renderButtons(starwarsList);
  $(document).on("click", ".movie-char", displayMovieInfo);

  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    console.log(state);
    console.log($(this).attr("data-animate"));
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#addChar").on("click", function() {
    var newChar = $("#search-input").val();
    if (newChar) {
      starwarsList.push(newChar);
      $("#search-input").val("");
      renderButtons(starwarsList);
    }
    return false;
  });
});
