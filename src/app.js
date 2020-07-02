const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//define paths
const publicDirectoryPath = path.join(__dirname, '../public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and vies location
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Darshan Mehta'
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Darshan"

    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        text: "Help text here",
        name: "Darshan"
    })
})



app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please, enter search value'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address,
    //     forecast: 'sunny day',
    //     location: 'vadodara'
    // })
})

app.get('/help/*', (req, res) => {
    res.render("help404", {
        title: "Help 404",
        text: "Help page not found",
        name: "Darshan"
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: "404 page",
        text: "Page not found - 404",
        name: "Darshan"
    })
})

app.listen("3000", () => {
    console.log('Listning on port ' + port)
})