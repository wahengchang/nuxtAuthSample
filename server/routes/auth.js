const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// Register route
router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Login route
router.post('/login', async(req, res) => {
    try {
        const { username, email, password } = req.body
        let user = await User.findOne({ $or: [{ username }, { email }] })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Logout route
router.post('/logout', (req, res) => {
    // In a JWT-based auth system, the client-side should handle token removal
    res.json({ message: 'Logged out successfully' })
})

// User route
router.get('/user', async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json({ user })
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
})

// Delete user route
router.delete('/user', async(req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByIdAndDelete(decoded.userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error })
    }
})

module.exports = router