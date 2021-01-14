$(document).ready(function () {



    var APIKey = "ffccfd79af0d76ce3841c8154e44fca10";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateCode + "&appid=" + APIKey;

    var cityName = "arlington";
    var stateCode = "TX";

    $("#buttonSrch").on("click", function (event) {
        event.preventDefault();

        var cityInput = $("#cityInput").val().trim();


    });

    // call the API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


    });

    // display the forecast
    function renderDays() {

    };

    // display the current weather 
    function renderCurrent() {

    };



})