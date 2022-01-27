var API_KEY = 'ed52e5ffcc1a0bae9395694f4fed7308'
var searchBtn = document.querySelector('.search-btn')
var fiveContainer = document.querySelector('.five-day-container')


searchBtn.addEventListener('click', function () {
    var searchedCity = document.querySelector('.input-value').value
    getCurrentWeather(searchedCity)
    saveHistory(searchedCity)
})

function saveHistory(value) {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        storage = []
    }
    storage.push(value)
    localStorage.setItem('weatherHistory', JSON.stringify(storage))
    getWeatherHistory()
}

getWeatherHistory()

function getWeatherHistory() {
    var storage = JSON.parse(localStorage.getItem('weatherHistory'))
    if (storage === null) {
        document.querySelector('.history').textContent = ''
    } else {
        document.querySelector('.history').textContent = ''
        for (var i = 0; i < storage.length; i++) {
            if (!storage[i]) {
                continue
            }
            var historyBtn = document.createElement('button')
            historyBtn.textContent = storage[i]
            document.querySelector('.history').append(historyBtn)

            historyBtn.addEventListener('click', function (event) {
                getCurrentWeather(event.target.textContent)
            })
        }
    }
}

function getCurrentWeather(value) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + value + '&units=imperial&appid=' + API_KEY)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const icon = data.weather[0].icon
            console.log(icon)
            var lat = data.coord.lat
            var lon = data.coord.lon
            getFiveDayWeather(lat, lon)
            const today = moment().format("M/D/YYYY")
            document.querySelector('.city-name').textContent = data.name + ' (' + today + ')'
            document.querySelector('.temp').textContent = 'Temp: ' + data.main.temp + ' F'
            //hum
            document.querySelector('.humidity').textContent = 'Humidity: ' + data.main.humidity
            //wind
            document.querySelector('.wind').textContent = 'Wind: ' + data.wind.speed

            document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

        })
}

function getFiveDayWeather(lat, lon) {
    fiveContainer.textContent = ''
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + API_KEY)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            document.querySelector('.uvi').textContent = 'UV Index: ' + data.current.uvi

            if (data.current.uvi < 3) {
                document.querySelector('.uvi').style.background = 'green'
            }
            else if (data.current.uvi > 3 && data.current.uvi < 7) {
                document.querySelector('.uvi').style.background = 'orange'
            } else {
                document.querySelector('.uvi').style.background = 'red'
            }


            for (var i = 0; i < 5; i++) {
                var card = document.createElement('div')
                fiveContainer.append(card)

                var date = document.createElement('h2')
                date.textContent = moment().add(i + 1, 'days').format("M/D/YYYY")
                card.append(date)

                const icon = data.daily[i + 1].weather[0].icon
                var img = document.createElement('img')
                img.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

                card.append(img)

                var fiveTemp = document.createElement('p')
                fiveTemp.textContent = 'Temp: ' + data.daily[i + 1].temp.day + ' F'
                card.append(fiveTemp)

                var fiveHum = document.createElement('p')
                fiveHum.textContent = 'Humidity: ' + data.daily[i + 1].humidity
                card.append(fiveHum)

                //get the wind
                var fiveWind = document.createElement('p')
                fiveWind.textContent = 'Wind: ' + data.daily[i + 1].wind_speed
                card.append(fiveWind)

            }
        })
    var h3 = document.getElementById('5dayh')
    h3.style.visibility = 'visible'
    var currentContainer = document.getElementById('current-container')
    currentContainer.style.visibility = 'visible'
}