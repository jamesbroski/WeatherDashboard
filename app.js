var APIkey = " d07b9275bb45428d6f5ad27aa9152b94 ";

var container = $("display");

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");

var currentDayCardWrapper = $("#currentDayWrapper");

var fiveDayCardWrapper = $("#fiveDayWrapper");

button.addEventListener("click", function () {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      inputValue.value +
      // "denver" +
      "&limit=1&appid=d07b9275bb45428d6f5ad27aa9152b94"
    // "&units=imperial&cnt=5&appid=d07b9275bb45428d6f5ad27aa9152b94"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      const lon = data[0].lon;
      const lat = data[0].lat;
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=hourly,minutely&units=imperial&appid=d07b9275bb45428d6f5ad27aa9152b94"

        // "&units=imperial&cnt=5&appid=d07b9275bb45428d6f5ad27aa9152b94"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // console.log(data);
          var currentDay = data.current;
          console.log(currentDayCardWrapper);
          currentDayCardWrapper.empty();

          //everything below is for five day forecast
          var fiveDay = data.daily.slice(0, 5);
          console.log(fiveDayCardWrapper);
          fiveDayCardWrapper.empty();
          // console.log(fiveDayCardWrapper);
          for (let index = 0; index < fiveDay.length; index++) {
            const element = fiveDay[index];

            //   <div id="day1">
            //   <p class="date">Date: 08-12-21</p>
            //   <p class="icon">Icon</p>
            //   <p class="temperature">Temp: 85 F</p>
            //   <p class="windSpeed">Wind: 9.23 MPH</p>
            //   <p class="humidity">Humidity: 34%</p>
            // </div>
            var milliseconds = element.dt * 1000;
            var year = new Date(milliseconds).getFullYear();
            var month = new Date(milliseconds).getMonth() + 1;
            var day = new Date(milliseconds).getDate();
            var currentDate = month + "/" + day + "/" + year;
            var dateEl = "<p class='date'>Date: " + currentDate + " </p>";
            var iconEl =
              "<img class='icon' src='https://openweathermap.org/img/w/" +
              element.weather[0].icon +
              ".png'>";
            var tempEl =
              "<p class='temperature'>Temp: " + element.temp.day + " F</p>";
            var windEl =
              "<p class='windSpeed'>Wind: " + element.wind_speed + " MPH</p>";
            var humidityEl =
              "<p class='humidity'>Humidity: " + element.humidity + " %</p>";

            var divDay =
              "<div id='day" +
              (index + 1) +
              "' class=col-1>" +
              dateEl +
              iconEl +
              tempEl +
              windEl +
              humidityEl +
              "</div>";

            $("#fiveDayWrapper").append(divDay);
          }
        });
    });
});
