const fs = require('fs')
var express = require('express');
const path = require('path')
var router = express.Router();
const forcast = require('../utils/forcast')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/:id', function(req, res, next) {
  console.log(req.params,req.body)

let location = loadLocations();

forcast(location, (error, result)=>{
  if(error) {
    res.send("unable to get Geolocations")
  }
res.send (result)
})
});

function loadLocations() {
try {
  let locations = fs.readFileSync(path.join(__dirname,'../data/locations.json'))
  loc = JSON.parse(locations.toString())
  return loc
}
catch(e){
  return []
}
}
module.exports = router;
