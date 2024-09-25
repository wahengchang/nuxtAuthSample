const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const collectionsRoutes = require('./routes/collections')
const morgan = require('morgan');
const app = express()

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(morgan(function(tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

app.use(bodyParser.json())

// Use auth routes
app.use('/api/auth', authRoutes)

// Add collections routes
app.use('/api/collections', collectionsRoutes)

module.exports = app