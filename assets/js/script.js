var API_KEY = 'ed52e5ffcc1a0bae9395694f4fed7308'
var searchBtn = document.querySelector('.search-btn')
var fiveContainer = document.querySelector('.five-day-container')


searchBtn.addEventListener('click', function() {
    var searchedCity = document.querySelector('.input-value').value
    getCurrentWeather(searchedCity)
})

function getCurrentWeather(value) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + value + '&units=imperial&appid=' + API_KEY)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        var lat = data.coord.lat
        var lon = data.coord.lon
        getFiveDayWeather(lat, lon)

        document.querySelector('.city-name').textContent = data.name
        document.querySelector('.temp').textContent = 'Temp: ' + data.main.temp + ' F'
        //hum

        //wind
    })
}

function getFiveDayWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&appid='+ API_KEY)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        document.querySelector('.uvi').textContent = 'UV Index: ' + data.current.uvi

        for (var i = 0; i < 5; i++) {
            var card = document.createElement('div')
            fiveContainer.append(card)

            var date = document.createElement('h2')
            date.textContent = moment().add(i + 1, 'days').format('dddd')
            card.append(date)

            var fiveTemp = document.createElement('p')
            fiveTemp.textContent = 'Temp: ' + data.daily[i + 1].temp.day + ' F'
            card.append(fiveTemp)
            
            var fiveHum = document.createElement('p')
            fiveHum.textContent = 'Humidity: ' + data.daily[i + 1].humidity
            card.append(fiveHum)

            //get the wind
        }
    })
}