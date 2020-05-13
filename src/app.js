const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views loocation
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title:'weatherapp',
        name: 'jess'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'weatheraboutpage',
        name: 'jess'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'help page',
        name: 'jess',
        message: 'this is the help page'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'must provide address'
        })
    }
    geocode.geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error) {
            return res.send(error)
        }
        forecast.forecast({
            latitude: latitude,
            longtitude: longtitude
        }, (error, forecastdata) => {
            if(error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
            console.log(location)
        })
        
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        //'Cannot set headers after they are sent to the client' this error means u r doing res.send more than once
        return res.send({
            error: 'must provide a search here'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('help404page', {
        title:'help page',
        name: 'jess',
        message: 'Help article not found'
    })})

app.get('*', (req,res) => {
    res.render('404page', {
        title: '404 page',
        name: 'jess',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server start on port' + port)
})






// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req,res) => {
//     res.send([{
//         name: 'Jess',
//         age:23
//     }, {
//         name: 'Bob',
//         age:22
//     }
// ])
// })

// app.get('/about', (req,res) => {
//     res.send('<h2>about page</h2>')
// })