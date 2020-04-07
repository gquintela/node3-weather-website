const request = require("request");
const getMyDate = require("./getMyDate");

const getUrlForecast = geoData => {
  const forecastBaseUrl = "https://api.darksky.net/forecast/";
  const forecastToken = "260e5723011c73bd2331d63ed3b9d264";
  const forecastgeoData = geoData.latitude + "," + geoData.longitude;
  const forecastQueries = "exclude=minutely,hourly,alerts,flags&units=si";
  return (
    forecastBaseUrl +
    forecastToken +
    "/" +
    forecastgeoData +
    "?" +
    forecastQueries
  );
};

const forecast = (geoData, callback) => {
  const forecastUrl = getUrlForecast(geoData);
  console.log(forecastUrl);
  request({
    url: forecastUrl,
    json: true
  }, (error, data) => {
    if (error) {
      callback("Unable to connect to the API.", undefined);
    } else {
      data["query"] = geoData.query;
      data["city"] = geoData.city;
      callback(undefined, data);
    }
  });
};

const handleDataForecast = (error, data) => {
  if (error) {
    console.log(error);
    return {};
  } else if (data.body.error === undefined) {
    dataWeather = {
      query: data.query,
      city: data.city,
      todayIcon: data.body.daily.icon,
      todayMin: Math.round(data.body.daily.data[0].temperatureMin),
      todayMax: Math.round(data.body.daily.data[0].temperatureMax),
      temperature: Math.round(data.body.currently.temperature),
      feelsLike: Math.round(data.body.currently.apparentTemperature),
      summary: data.body.daily.summary,
      precipitationProbability: (parseFloat(data.body.currently.precipProbability) * 100),
      extended: extendedWeather(data.body.daily.data)
    };
    console.log("weather data retrieved!");
    console.log(dataWeather);
    return dataWeather;
  } else {
    const msg = "Error " + data.body.code + ":" + data.body.error;
    console.log(msg);
    return {};
  }
};


const extendedWeather = data => {
  let answer = [];
  let forecast = "";
  for (let i = 1; i < data.length; i++) {
    date = getMyDate(data[i].time);
    icon = data[i].icon
    forecast =
      data[i].summary +
      "\n" +
      "Min: " +
      Math.round(data[i].temperatureMin) +
      "\xB0\n" +
      "Max: " +
      Math.round(data[i].temperatureMax) +
      "\xB0\n" +
      "Precip. probability: " +
      parseFloat(data[i].precipProbability) * 100 +
      "%.";
    answer.push({
      date: date,
      forecast: forecast,
      icon: icon
    });
  }
  debugger;
  return answer;
};

module.exports = {
  forecast,
  handleDataForecast
};