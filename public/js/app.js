const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const msg3 = document.querySelector("#msg3");
const msg4 = document.querySelector("#msg4");
const subtitle = document.querySelector("#subtitle");

weatherForm.addEventListener("submit", e => {
  e.preventDefault(); ///disable auto refresh

  subtitle.textContent = "loading...";

  fetch("/weather?adress=" + search.value).then(response => {
    response.json().then(data => {
      if (data.error) {
        subtitle.textContent = "ERROR";
        msg1.textContent = data.error.toUpperCase();
        msg2.textContent = "";
        msg3.textContent = "";
        msg4.textContent = "";
      } else {
        subtitle.textContent = data.city.toUpperCase();
        msg1.textContent = "SUMMARY: " + data.summary.toUpperCase();
        msg2.textContent = "TEMPERATURE: " + data.temperature + "\xB0";
        msg3.textContent = "FEELS LIKE " + data.feelsLike + "\xB0";
        msg4.textContent =
          "PROBABILITY OF PRECIPITATION: " +
          data.precipitationProbability +
          "%";
      }
    });
  });
});
