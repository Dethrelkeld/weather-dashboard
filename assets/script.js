$(document).ready(function () {
    

    var APIKeyWeather = "fccfd79af0d76ce3841c8154e44fca10";
    // Cities in favorites
    var cities = ["Austin", "Dallas", "San Antonio"]
    // for loop to call func to make cities 
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
    // api call to get weather for city input
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
            var cardTitle = $("<h2>").addClass("card-title").text(response.name);
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            var currTemp = $("<h3>").text("Current Temp " + response.main.temp + " F");
            var currHumid = $("<h3>").text("Humidity " + response.main.humidity + "%");
            var currFeel = $("<h3>").text("Feels like " + response.main.feels_like + " F");
            
            $("#current").append(card.append(cardBody.append(cardTitle.append(icon, currTemp, currFeel, currHumid))));
        });
    }
    // api call to get forecast using data returned from previous api call
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
                var col = $("<div>").addClass("col-md-3")
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h4>").addClass("card-title").text(response.daily[i].dt);
                var currTemp = $("<h5>").text("Current Temp " + response.daily[i].temp + " F");
                var currHumid = $("<h5>").text("Humidity " + response.daily[i].humidity + "%");
                var currFeel = $("<h5>").text("Feels like " + response.daily[i].feels_like + " F");
    
        
                $("#forecast").append(col.append(card.append(cardBody.append(cardTitle, currTemp, currFeel, currHumid))))
            }
        });
    }
    // when clicking one of the city buttons
    // $("#buttonSrch").on("click", function (event) {
    //     event.preventDefault();
    // });









});
