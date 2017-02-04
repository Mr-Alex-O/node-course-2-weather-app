const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options({
  a:{
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  let data = response.data;
  if(data.status === 'ZERO_RESULTS'){
    throw new Error('Unable to find the address.');
  }

  let {lat,lng} = data.results[0].geometry.location;
  let weatherUrl = `https://api.darksky.net/forecast/6efa107f23657d691e0536537b9e7c2f/${lat},${lng}`;
  console.log(data.results[0].formatted_address);
  return axios.get(weatherUrl)
  .then((response) => {
    let{temperature, apparentTemperature} = response.data.currently;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
  })
}).catch((e) => {
  if(e.code === 'ECONNREFUSED'){
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
