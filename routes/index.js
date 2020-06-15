const express = require('express')
const router = express.Router()

const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

module.exports = () => {
    router.get('/', (req, res) => {
        res.send('Home')
    })

    router.use('/speakers', speakersRoute())
    router.use('/feedback', feedbackRoute())

    return router
}