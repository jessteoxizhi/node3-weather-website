const request = require('request')

const forecast = ({longtitude,latitude},callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=53a03a71e45932a5ee1973263c9ec9ef&query=' + latitude + ',' + longtitude + '&units=m'
    request({url, json: true}, (error, {body}) =>{
    if (error) {
        callback('unable to retrieve information')
    } else if (body.error) {
        callback('unable to find location')
    } else {
        callback(undefined,body.current.weather_descriptions[0] + '. '+'Current temp is '+ body.current.temperature + ' feels like ' + body.current.feelslike + ' The humidity is ' + body.current.humidity + '%.')
    }
})
}

module.exports = {
    forecast : forecast
}