const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    
const url = 'https://api.darksky.net/forecast/41452d31027bcf8ebdd54bd5a3ece8a4/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
request({url ,json: true},(error, {body})=>{
    if(error)
    {
        callback('Unable to connect')
    }
    else if(body.error)
    {
        callback(undefined, 'Unable to find place')
    }
    else callback(undefined,
        body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degree out. There is a high '+ body.daily.data[0].temperatureHigh+' with a low of '+ body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain.'    
    )
})
}
module.exports = forecast