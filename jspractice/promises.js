console.log('promises')

/*synchronous code blocks the execution
async code does not 
how do u know when it finishes? and what if i have to do something after the async func completes? 
eg: API call
*/

//promise returning a string
// const getLocation = new Promise((resolve, reject) => {
//   try {
//     resolve('CA')
//   } catch (e) {
//     reject(e)
//   }
// })

// // promise returning an obj
// const getLocationObj = new Promise((resolve, reject) => {
//   try {
//     resolve({ location: 'CA' })
//   } catch (e) {
//     reject(e)
//   }
// })

// const getWeatherAtLocation = (loc) =>
//   new Promise((res, rej) => {
//     switch (loc) {
//       case 'NV':
//         res('Sunny')
//         break
//       case 'CA':
//         res('Partly Cloudy')
//         break
//       default:
//         rej('Not found')
//     }
//   })

// // using then & catch
// getLocation
//   .then(getWeatherAtLocation) // resolved data from getLocation directly gets into the second promise as param
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e))

// //handling the error is two ways
// // one using .then(success, error) callbacks
// //two using the catch block
// getLocation
//   .then(getWeatherAtLocation) // resolved data from getLocation directly gets into the second promise as param
//   .then(
//     (data) => console.log(data),
//     (e) => console.log(e)
//   )

// getLocationObj
//   .then((res) => getWeatherAtLocation(res.location)) // need to return the second promise by passing the destrucred param
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e))

// //incase if u have anything that needs to be run in either the case of resolve or reject
// getLocation
//   .then(getWeatherAtLocation)
//   .then((data) => console.log(data))
//   .catch((e) => console.log(e))
//   .finally(() => console.log('all done'))

/* try these 
  https://geocoding-api.open-meteo.com/v1/search?name=sparks
  https://api.open-meteo.com/v1/forecast?latitude=39.53491&longitude=-119.75269&current_weather=true
  */

const getWeatherByCity = (city) => {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`

  const result = fetch(geoUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`)
      }
      return res.json()
    })
    .then((data) => {
      if (data.results.length === 0) {
        throw new Error(`Error: no results found`)
      }
      const { latitude, longitude } = data.results[0]

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      return fetch(weatherUrl)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      return response.json()
    })
    .then((weatherData) => {
      const temp = weatherData.current_weather.temperature
      const tempunits = weatherData.current_weather_units.temperature

      return `Temperature at ${city} is ${temp} ${tempunits}`
    })
    .catch((error) => {
      throw new Error(`No data:  could not fetch data ${error}`)
    })

  return result
}

getWeatherByCity('sparks')
  .then((res) => console.log(res))
  .catch((e) => console.log(e))
  .finally(() => console.log('All done'))

const getWeatherByCityAsync = async (city) => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    )

    if (!res.ok) {
      throw new Error(`Error: error from get lats and long`)
    }

    const fetchLatAndLong = await res.json()

    if (fetchLatAndLong.results.length === 0) {
      throw new Error(`Error: No results for city`)
    }

    const { latitude, longitude } = fetchLatAndLong.results[0]

    const tempResp = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )

    if (!tempResp.ok) {
      throw new Error(`Error: error from get temp api`)
    }

    const data = await tempResp.json()
    const temp = data.current_weather.temperature
    const tempunits = data.current_weather_units.temperature

    return `Temperature at ${city} is ${temp} ${tempunits}`
  } catch (error) {
    throw new Error(`Error: data not found for ${city}`)
  }
}

getWeatherByCityAsync('sparksip')
  .then((res) => console.log(res))
  .catch((e) => console.log(e.message))
  .finally(() => console.log('All done from async'))
