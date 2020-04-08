const location2 = document.querySelector("#location");
location2.select()

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const dayNowName = document.querySelector("#dayNowName")
const iconNow = document.querySelector("#iconNow")
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
const icon1 = document.querySelector("#icon1")
const icon2 = document.querySelector("#icon2")
const icon3 = document.querySelector("#icon3")
const icon4 = document.querySelector("#icon4")
const icon5 = document.querySelector("#icon5")
const icon6 = document.querySelector("#icon6")
const icon7 = document.querySelector("#icon7")
const day1descriptionText = document.querySelector("#day1-descriptionText");
const day2descriptionText = document.querySelector("#day2-descriptionText");
const day3descriptionText = document.querySelector("#day3-descriptionText");
const day4descriptionText = document.querySelector("#day4-descriptionText");
const day5descriptionText = document.querySelector("#day5-descriptionText");
const day6descriptionText = document.querySelector("#day6-descriptionText");
const day7descriptionText = document.querySelector("#day7-descriptionText");
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
        dayNowName.textContent = "TODAY: " + data.extended[0].date
        iconNow.src = `../img/icons/${data.todayIcon}.png`
        icon1.src = `../img/icons/${data.extended[1].icon}.png`
        icon2.src = `../img/icons/${data.extended[2].icon}.png`
        icon3.src = `../img/icons/${data.extended[3].icon}.png`
        icon4.src = `../img/icons/${data.extended[4].icon}.png`
        icon5.src = `../img/icons/${data.extended[5].icon}.png`
        icon6.src = `../img/icons/${data.extended[6].icon}.png`
        icon7.src = `../img/icons/${data.extended[7].icon}.png`
        msg1.textContent = "SUMMARY: " + data.summary.toUpperCase();
        msg2.textContent = "FEELS LIKE " + data.feelsLike + "\xB0.";
        msg3.textContent = "MIN: " + data.todayMin + "\xB0";
        msg4.textContent = "MAX: " + data.todayMax + "\xB0";
        extendedTitle.textContent = "EXTENDED FORECAST";
        day1name.textContent = data.extended[1].date;
        day2name.textContent = data.extended[2].date;
        day3name.textContent = data.extended[3].date;
        day4name.textContent = data.extended[4].date;
        day5name.textContent = data.extended[5].date;
        day6name.textContent = data.extended[6].date;
        day7name.textContent = data.extended[7].date;
        day1descriptionText.textContent = data.extended[1].forecast;
        day2descriptionText.textContent = data.extended[2].forecast;
        day3descriptionText.textContent = data.extended[3].forecast;
        day4descriptionText.textContent = data.extended[4].forecast;
        day5descriptionText.textContent = data.extended[5].forecast;
        day6descriptionText.textContent = data.extended[6].forecast;
        day7descriptionText.textContent = data.extended[7].forecast;

        $(".description").addClass("backColor");
        $("#extended-forecast").removeClass("hide");
        $("#current-container").removeClass("hide");
        $(".current").removeClass("hide");
      }
    });
  });
});