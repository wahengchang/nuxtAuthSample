const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()

// Body parser middleware
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/nuxt-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// User model
const User = mongoose.model('User', {
    email: String,
    password: String
})

// Auth routes
app.post('/api/auth/register', async(req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(400).json({ message: 'Error creating user' })
    }
})

app.post('/api/auth/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token, user: { email: user.email } })
    } catch (error) {
        res.status(400).json({ message: 'Error logging in' })
    }
})

app.get('/api/auth/user', async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json({ user: { email: user.email } })
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
})

// Nuxt.js setup
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)

builder.build()

app.use(nuxt.render)

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})