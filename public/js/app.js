const location2 = document.querySelector("#location");
location2.select()

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
const msg3 = document.querySelector("#msg3");
const msg4 = document.querySelector("#msg4");
const day1name = document.querySelector("#day1name");
const day2name = document.querySelector("#day2name");
const day3name = document.querySelector("#day3name");
const day4name = document.querySelector("#day4name");
const day5name = document.querySelector("#day5name");
const day6name = document.querySelector("#day6name");
const day7name = document.querySelector("#day7name");
const day1description = document.querySelector("#day1-description");
const day2description = document.querySelector("#day2-description");
const day3description = document.querySelector("#day3-description");
const day4description = document.querySelector("#day4-description");
const day5description = document.querySelector("#day5-description");
const day6description = document.querySelector("#day6-description");
const day7description = document.querySelector("#day7-description");
const extendedTitle = document.querySelector("#extended-title");

const extended_title = document.querySelector("#extended-title");
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
        $("#extended-forecast").addClass("hide");
        $(".current").addClass("hide");
        $("#msg1").removeClass("hide");
      } else {
        subtitle.textContent = data.city.toUpperCase();
        msg1.textContent = "SUMMARY: " + data.summary.toUpperCase();
        msg2.textContent = "FEELS LIKE " + data.feelsLike + "\xB0";
        msg3.textContent = "MIN:: " + data.todayMin + "\xB0";
        msg4.textContent = "MAX: " + data.todayMax + "\xB0";
        extendedTitle.textContent = "EXTENDED FORECAST";
        day1name.textContent = data.extended[0].date;
        day2name.textContent = data.extended[1].date;
        day3name.textContent = data.extended[2].date;
        day4name.textContent = data.extended[3].date;
        day5name.textContent = data.extended[4].date;
        day6name.textContent = data.extended[5].date;
        day7name.textContent = data.extended[6].date;
        day1description.textContent = data.extended[0].forecast;
        day2description.textContent = data.extended[1].forecast;
        day3description.textContent = data.extended[2].forecast;
        day4description.textContent = data.extended[3].forecast;
        day5description.textContent = data.extended[4].forecast;
        day6description.textContent = data.extended[5].forecast;
        day7description.textContent = data.extended[6].forecast;

        $(".description").addClass("backColor");
        $("#extended-forecast").removeClass("hide");
        $("#current-container").removeClass("hide");
        $(".current").removeClass("hide");
      }
    });
  });
});