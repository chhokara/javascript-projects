window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureIcon = document.querySelector(".temperature-icon");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a7b37fc8fa9faed677e7e0bd192282ed`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          const updatedTemp = toFahrenheit(temp);
          temperatureDegree.textContent = updatedTemp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;
          temperatureIcon.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${icon}@2x.png`
          );
          let celsius = (updatedTemp - 32) * (5 / 9);
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = updatedTemp;
            }
          });
        });
    });
  }

  function toFahrenheit(num) {
    const res = (num - 273.15) * 1.8 + 32;
    return res.toFixed(0);
  }
});
