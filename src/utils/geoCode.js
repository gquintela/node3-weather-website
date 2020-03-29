const request = require("request");

const getUrlGeoCode = adress => {
  const geoCodeBaseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  var geoCodeCityInput = encodeURIComponent(adress);
  const geoCodeToken =
    "pk.eyJ1Ijoid2VhdGhlcmFwcDIwMjAiLCJhIjoiY2s4OHoxcXZiMDFsZjNqcXhqcmJycG4yMyJ9.WIUKt5mUMerEDbJ2Xc3TMQ";
  const geoCodeQueries = "limit=1";
  return (
    geoCodeBaseUrl +
    geoCodeCityInput +
    ".json?access_token=" +
    geoCodeToken +
    "&" +
    geoCodeQueries
  );
};

const geoCode = (adress, callback) => {
  const geoCodeUrl = getUrlGeoCode(adress);

  request({ url: geoCodeUrl, json: true }, (error, data) => {
    if (error) {
      callback({ error: "Unable to connect to the API." }, undefined);
    } else if (data.body.message) {
      callback("Error:\n" + data.body.message);
    } else if (data.body.features.length == 0) {
      callback(
        {
          query: adress,
          error: "Could not find the city " + adress
        },
        undefined
      );
    } else {
      rawData = data.body.features[0];
      newData = {
        query: adress,
        city: rawData.place_name,
        latitude: rawData.center[1],
        longitude: rawData.center[0]
      };
      callback(undefined, newData);
    }
  });
};

handleDataGeoCode = (error, data) => {
  if (error) {
    console.log("error:", error);
    return { error };
  } else {
    console.log("Location successfully retrieved!\n");
    return data;
  }
};

module.exports = { geoCode, handleDataGeoCode };
