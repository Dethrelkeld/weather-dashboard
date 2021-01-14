$(document).ready(function () {

    var APIKey = "ffccfd79af0d76ce3841c8154e44fca10";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "&appid=" + APIKey;

    var cityName = "arlington";
    var stateCode = "TX"


    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);






    });

})