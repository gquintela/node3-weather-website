const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const app = express();

const port = process.env.PORT || 3000;

///express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

/// setup static directory to serve
app.use(express.static(publicDirectoryPath));

///index view
app.get("", (req, res) => {
  res.render("index", {
    title: "WEATHER FORECAST",
    name: "Gonzalo Quintela"
  });
});

///about view
app.get("/about.html", (req, res) => {
  res.render("about", {
    title: "ABOUT ME",
    name: "Gonzalo Quintela"
  });
});

///help view
app.get("/help.html", (req, res) => {
  res.render("help", {
    title: "HELP",
    message: "un mensaje",
    name: "Gonzalo Quintela"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "Please provide a city."
    });
  }

  geoCode.geoCode(req.query.adress, (error, data) => {
    const dataGeoCode = handleDataGeoCode(error, data);
    if (dataGeoCode.error) {
      return res.send(dataGeoCode.error);
    }
    forecast.forecast(dataGeoCode, (error, data) => {
      res.send(forecast.handleDataForecast(error, data));
    });
  });
});

//404 help article not found
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found.",
    name: "Gonzalo Quintela"
  });
});

//404 page not found
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found.",
    name: "Gonzalo Quintela"
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});