var APIkey = " d07b9275bb45428d6f5ad27aa9152b94 ";

var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var desc = document.querySelector(".desc");
var temp = document.querySelector(".temp");

button.addEventListener("click", function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      inputValue.value +
      "&appid=d07b9275bb45428d6f5ad27aa9152b94"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
});
