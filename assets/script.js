$(document).ready(function () {
    // // for testing
    // var lat = 33.441792;
    // var lon = -94.037689;
    // var part = "current"

    var APIKeyWeather = "fccfd79af0d76ce3841c8154e44fca10";
    
    var cities = ["Austin", "Dallas", "San Antonio"]
    
    for(var i = 0; i < cities.length; i++) {
        createList(cities[i])
    }

    function createList(text) {
        var li = $("<li>").addClass("list-group-item").text(text)
        $("ul").append(li)
    }



    // when clicking the search button
    $("#buttonSrch").on("click", function (event) {
        event.preventDefault();
        var cityInput = $("#cityInput").val().trim();
        searchWeather(cityInput);
        if(cities.indexOf(cityInput) === -1) {

            cities.push(cityInput)
            createList(cityInput)
        }

    });

    function searchWeather(cityName) {
        var currentQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKeyWeather;
        $("#current").empty();
        $.ajax({
            url: currentQueryURL,
            method: "GET",
            dataType:"json"
        }).then(function (response) {
            console.log(response);
            getForecast(response.coord.lat, response.coord.lon);
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h3>").addClass("card-title").text(response.name);
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

            $("#current").append(card.append(cardBody.append(cardTitle.append(icon))));
        });
    }

    function getForecast(lat, lon){
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely" + "&appid=" + APIKeyWeather;
        $("#forecast").empty();
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for(var i = 1; i < 6; i++) {
                console.log(response.daily[i])
                var col = $("<div>").addClass("col-md-2")
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h3>").addClass("card-title").text(response.daily[i].dt);
    
        
                $("#forecast").append(col.append(card.append(cardBody.append(cardTitle))))
            }
        });
    }
    // when clicking one of the city buttons
    // $("#buttonSrch").on("click", function (event) {
    //     event.preventDefault();
    // });

    // // call the API for current

    //     // display the current weather 
    //     function renderCurrent() {

    //     };
    //     renderCurrent();

    // });

    // // call API for five day forecast







});
