function GetInfo() {
  const newName = document.getElementById("cityInput");
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = "--" + newName.value + "--";

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      newName.value +
      "&units=imperial&appid=bcd3d44da3112d7e38199a37b39882b7"
  )
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Temp").innerHTML =
          "Temp: " + Number(data.list[i].main.temp).toFixed(1) + "°";
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Humidity").innerHTML =
          "Humidity: " + (data.list[i].main.humidity)
      }
        for (i = 0; i < 5; i++) {
          document.getElementById("day" + (i + 1) + "Wind").innerHTML =
            "Wind Speed: " + (data.list[i].wind.speed)
        }
      for (i = 0; i < 5; i++) {
        document.getElementById("img" + (i + 1)).src =
          "http://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
      }
    })

    .catch((err) => alert("Something Went Wrong"));
}



function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "Atlanta";
  GetInfo();
}

var d = new Date();
var weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}
for (i = 0; i < 5; i++) {
  document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

currentDay = dayjs();
$("#currentDay").text(currentDay.format("dddd MMM D, YYYY"));
