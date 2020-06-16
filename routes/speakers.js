const express = require('express')
const router = express.Router()

module.exports = (params) => {
    const {speakerService} = params
    
    router.get('/', async (req, res) => {
        const speakers = await speakerService.getList()
        return res.json(speakers)
    })

    router.get('/:speaker', (req, res) => {
        res.send(`This is the details page for ${req.params.speaker}`)
    })

    return router
}