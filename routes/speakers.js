const express = require('express')
const router = express.Router()

module.exports = () => {
    router.get('/', (req, res) => {
        res.send('Speakers List')
    })

    router.get('/:speaker', (req, res) => {
        res.send(`This is the details page for ${req.params.speaker}`)
    })

    return router
}