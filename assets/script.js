let cityArr = [];
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

function addToList(newName) {
  var list = document.getElementById("list"); // only needed if more than one form or list
  var listItem = document.createElement("li");
  var inputItem = this.cityInput;
  listItem.innerText = newName;
  listItem.addEventListener('click', onCityListItemClick)
  list.appendChild(listItem);
  inputItem.select();
  inputItem.focus();
  return false; // stop submission
}

function onCityListItemClick(e) {
  const city = e.target.innerHTML
  document.getElementById("cityInput").value = city
  GetInfo();
}

function GetInfo(event) {
  if (event) {
    event.preventDefault()
  }
  const newName = document.getElementById("cityInput").value;
  if (!cityArr.includes(newName)) {
    cityArr.push(newName);
    addToList(newName);
  }

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      newName +
      "&units=imperial&appid=bcd3d44da3112d7e38199a37b39882b7"
  )
    .then((response) => response.json())
    .then((data) => {
      for (i = 0; i < 5; i++) {
        document.getElementById("date" + (i + 1)).innerHTML =
          dayjs.unix(data.list[i*8].dt).format('MMM D, YYYY')
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Temp").innerHTML =
          "Temp: " + Number(data.list[i*8].main.temp).toFixed(1) + "°";
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Humidity").innerHTML =
          "Humidity: " + data.list[i].main.humidity;
      }
      for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1) + "Wind").innerHTML =
          "Wind Speed: " + data.list[i*8].wind.speed;
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
  document.getElementById("cityName").defaultValue = "Atlanta";
  document.getElementById("form1").onsubmit = GetInfo;
  GetInfo();
}


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

// currentDay = dayjs();
// $("#currentDay").text(currentDay.format("dddd MMM D, YYYY"));

