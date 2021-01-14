$(document).ready(function () {

    var APIKey = "ffccfd79af0d76ce3841c8154e44fca10";
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + APIKey;


    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);






    });

})