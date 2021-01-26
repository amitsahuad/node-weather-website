const path = require('path');
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

//Defne paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/viwes')
const partialPath = path.join(__dirname, '../templates/partials')

//setup static directort to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars and viwes location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Amit'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Amit',
        text: 'This is help section'

    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about',
        name: 'Amit'

    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Amit',
        errorMessage: 'Help article not found'
    })
})





    // app.get('/help', (req,res)=>{
    //     res.send([{
    //         name: 'AMit',
    //         age: 21
    //     },
    //     {
    //         name: 'ankit',
    //         age: 19
    //     }])
    // })

    // app.get('/about', (req, res)=>{
    //     res.send('<h1>ABOUT<h1>')
    // })

    
// app.get('/products',(req, res)=>{
//     if(!req.query.search)
//     {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
    
//     res.send({
//         product: []
//     })
// })

app.get('/weather', (req, res)=>{
    if(!req.query.address)
    {
        res.send({
            error: 'Please provide address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error,forecastData)=>{
        if(error)
        {
            return res.send({
                error
            })
        }

        
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })

    })
})


app.get('*', (req, res)=>{
    res.render('404',{
        title : '404',
        name: 'Amit',
        errorMessage: 'Page not found'
    })

}) 

// app.com
// app.com/help
// app.com/about

app.listen(3000, ()=>{
    console.log('server is up on 3000')
})