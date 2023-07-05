// Send a request to the uri, then parse JSON and store the data 
// (location, temperature and the time of observation 
var request = require("request");
request({
   uri: reqUrl,
   method: "GET",
   timeout: 10000,
   followRedirect: true,
   maxRedirects: 10
}, function(error, response, body) {
   var parsedJSON = JSON.parse(body);
   var currTemp = parsedJSON.data.current_condition[0].temp_C;
   var obsTime = parsedJSON.data.current_condition[0].observation_time;
   storeTemperature(location, currTemp, obsTime);
});

// Store location, temperature and time of the observation
function storeTemperature(loc, temp, obstime) {
   var mongoose = require('mongoose');
   // connect to a db at localhost
   mongoose.connect('localhost', 'temperatures');
   // define the db schema
   var schema = mongoose.Schema({ 
      location: String, 
      temperature: String, 
      observationTime: String 
   });

   var Temperature = mongoose.model('Temperature', schema);
   // Create a new object with the fields initialized by the read data
   var t = new Temperature({
      location: loc, 
      temperature: temp, 
      observationTime: obstime
   })
   // attempt to save the data
   t.save(function(err) {
     if (err) {
        console.log("error saving"); 
     } else {
        console.log("saved");
        throw '';
     }
 });
}
80