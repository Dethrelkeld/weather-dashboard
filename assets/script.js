$(document).ready(function () {


    var APIKeyWeather = "fccfd79af0d76ce3841c8154e44fca10";
    // Cities in favorites
    var cities = ["Austin", "Dallas", "San Antonio"]
    // for loop to call func to make cities 
    for (var i = 0; i < cities.length; i++) {
        createList(cities[i])
    }
    
    function createList(text) {
        var button = $("<button>").addClass("list-group-item").text(text);
        $("ul").append(button)
    }
    
    
    
    
    // when clicking the search button
    $("#buttonSrch").on("click", function (event) {
        event.preventDefault();
        var cityInput = $("#cityInput").val().trim();
        searchWeather(cityInput);
        
    });
    
    // When clicking on favorites
    $("button").on("click", function (event) {
        event.preventDefault();
        var favoriteCity = $(this).text();
        searchWeather(favoriteCity);

    });
    // api call to get weather for city input
    function searchWeather(cityName) {
        var currentQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKeyWeather;
        $("#current").empty();
        $.ajax({
            url: currentQueryURL,
            method: "GET",
            dataType: "json"
        }).then(function (response) {
            console.log(response);
            getForecast(response.coord.lat, response.coord.lon);
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h2>").addClass("card-title").text(response.name);
            var icon = $("<img>").attr("src", `https://openweathermap.org/img/w/${response.weather[0].icon}.png`)
            var currTemp = $("<h3>").text("Current Temp " + Math.round(response.main.temp) + " F");
            var currHumid = $("<h3>").text("Humidity " + response.main.humidity + "%");
            var currFeel = $("<h3>").text("Feels like " + response.main.feels_like + " F");
            
            if (cities.indexOf(response.name) === -1) {
                
                cities.push(response.name)
                createList(response.name)
            };
            
            
            $("#current").append(card.append(cardBody.append(cardTitle.append(icon, currTemp, currFeel, currHumid))));
        });
    }
    // api call to get forecast using data returned from previous api call
    function getForecast(lat, lon) {
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial" + "&appid=" + APIKeyWeather;
        $("#forecast").empty();
        $.ajax({
            url: forecastQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // loop to create cards for forecasted days
            for (var i = 1; i < 5; i++) {
                // Months array
                var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                // Convert timestamp to milliseconds
                var date = new Date(response.daily[i].dt * 1000);
                // Month
                var month = months_arr[date.getMonth()];
                // Day
                var day = date.getDate();
                console.log(response.daily[i])
                var col = $("<div>").addClass("col-md-3")
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardTitle = $("<h4>").addClass("card-title").text(month + " " + day);
                var currTempMax = $("<h5>").text("High " + response.daily[i].temp.max + " F");
                var currHumid = $("<h5>").text("Humidity " + response.daily[i].humidity + "%");
                var currTempMin = $("<h5>").text("Low " + response.daily[i].temp.min + " F");
                

                
                
                
                $("#forecast").append(col.append(card.append(cardBody.append(cardTitle, currTempMax, currTempMin, currHumid))))
            }
        });
    }
    
    
    
    
    





});
