const axios = require('axios');

const forcast = (location, callback) => {
  locationReqs = location.map(loc => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(loc.location) +
        ".json?limit=1&access_token=pk.eyJ1Ijoic2hyZXlhc3AiLCJhIjoiY2p3OHM3dzJrMGhybzRhcXJtMGdrd2VidCJ9.-T7L9U8MHuZ5ODJt5H9LhQ"
    return axios.get(url)
  })
  axios.all(locationReqs).then((response => {
        console.log(response)
        let weatherURLs = response.map((res, i) => {
          let lattitude = res.data.features[0].center[0]
          let longitude = res.data.features[0].center[1]
          let url = "https://api.darksky.net/forecast/1d744a940ada31de4c6cd75e9d3fc989/" +
           lattitude + ',' + longitude
          // (location[i].units === "Celsius")? "?units=si" : ""
          url+= (location[i].units === "Celsius")? "?units=si" : ""
          return axios.get(url)
        })

        axios.all(weatherURLs).then((resp => {
              console.log(resp)
          let result  = resp.map((w,i) =>{
            return   {
             location: location[i].location,
             weather : w.data.daily.summary
           }
          })
              callback(undefined, result)
            })
            , (error) => {
              callback(error, undefined)
              console.log(error.response.body);
            })
      })
      , (error) => {
        callback(error, undefined)
        console.log(error.response.body);

      })
}

// const forcast = (someparam,callback)=> {
//   (async () => {
//     try {
//       const [response1, response2] = await axios.all([
//         axios.get(
//             'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-18'),
//         axios.get(
//             'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-17')
//
//       ]);
//       console.log(response1.data.url);
//       console.log(response1.data.explanation);
//
//       console.log(response2.data.url);
//       console.log(response2.data.explanation);
//       callback(undefined, response1.data.url)
//     } catch (error) {
//       callback(error,undefined)
//       console.log(error.response.body);
//     }
//   })()
// }

// const forcast = (someparam,callback)=> {
//  axios.all([
//         axios.get(
//             'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-18'),
//         axios.get(
//             'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2020-03-17')
//
//       ]).then(axios.spread((response1,response2) => {
//       console.log(response1.data.url);
//       console.log(response1.data.explanation);
//       console.log(response2.data.url);
//       console.log(response2.data.explanation);
//       callback(undefined, response1.data.url)})
// ,(error)=>{
//       callback(error,undefined)
//       console.log(error.response.body);
//
// })
// }

module.exports = forcast
