const defaultBgImage = `https://images.unsplash.com/photo-1632864790429-9669f5c2ecd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzMyNTU0NTg&ixlib=rb-4.0.3&q=80&w=1080`
const defaultLocation = 'Kenia'
let premierLeagueTable
let teamRank = 1;

// Background Image and Details
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=afrika")
  .then(res => res.json())
  .then(data => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    if (data.location.name) {
      document.getElementById('location').innerHTML = `<p class="text-xl"><i class="fa-solid fa-location-pin text-orange-500"></i>&nbsp;${data.location.name}</p>`
    } else {
      document.getElementById('location').innerHTML = `<p class="text-xl"><i class="fa-solid fa-location-pin text-orange-500"></i>&nbsp;Not Available</p>`
    }
  })
  .catch(err => {
    // Default background image and location
    document.body.style.backgroundImage = defaultBgImage
    document.getElementById('location').textContent = defaultLocation
  })

// Crypto Details
fetch("https://api.coingecko.com/api/v3/coins/ethereum")
  .then(res => {
    if (!res.ok) {
      throw Error("Something went wrong with your request")
    }
    return res.json()
  })
  .then(data => {
    document.getElementById("crypto-top").innerHTML = `
            <p class="shadow-sm ml-0 mr-2 font-bold text-2xl text-gray-400"><i class="fa-brands fa-ethereum"></i></p>
            <p class="ml-2.5">${data.name}</p>
        `
    document.getElementById("crypto-details").innerHTML += `
            <p class="text-yellow-400 text-lg font-bold"><i class="fa-solid fa-coins"></i>&nbsp;€${data.market_data.current_price.eur}</p>
            <p class="text-green-400 text-lg font-bold"><i class="fa-solid fa-arrow-up-right-dots"></i>&nbsp;€${data.market_data.high_24h.eur}</p>
            <p class="text-red-600 text-lg font-bold"><i class="fa-solid fa-thumbs-down"></i>&nbsp;€${data.market_data.low_24h.eur}</p>
        `
  })
  .catch(err => console.error(err))

// Random Advice/Quotes
fetch(`https://api.adviceslip.com/advice`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('advice').innerHTML = `<q class="text-lg bg-gradient-to-r from-blue-500 to-transparent text-gray-200 font-bold px-6 py-4 border rounded-lg border-4 border-gray-200">${data.slip.advice}</q>`
  })

// English premier league current table standings
fetch(`https://api-football-standings.azharimm.dev/leagues/eng.1/standings?season=2022&sort=asc`)
  .then(res => res.json())
  .then(data => {
    premierLeagueTable = data.data.standings.slice(0, 6)
    console.log(premierLeagueTable.length)
    premierLeagueTable.forEach(item => {
      document.getElementById('epl-table').innerHTML += `
                  <tr class="table-row">
                    <td class="table-cell p-0 text-center">${teamRank++}</td>
                    <td class="table-cell py-2"><img class="team-logo" src=${item.team.logos[0].href} alt="Team Logo">
                        ${item.team.abbreviation}</td>
                    <td class="table-cell py-2 text-center">${item.stats[2].displayValue}</td>
                  </tr>
                `
    })

  })

// Getting current time
function getCurrentTime() {
  const date = new Date()
  document.getElementById("time").textContent = date.toLocaleTimeString("en-GB", { timeStyle: "medium" })
}

// Setting time ticker after every second
setInterval(getCurrentTime, 1000)

// Getting user geo-coordinates while fetching current weather details
navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(res => {
      if (!res.ok) {
        throw Error("Weather data not available")
      }
      return res.json()
    })
    .then(data => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      document.getElementById("weather-details").innerHTML = `
                <div class="flex items-center justify-end text-lg">
                    <img src=${iconUrl} class="weather-icon" alt="current weather icon"/>
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                </div>
                <p class="mt-0 capitalize text-lg">${data.weather[0].description}</p>
                <p class="text-lg mt-0 ml-0.5">${data.name}</p>
            `
    })
    .catch(err => console.error(err))
});
