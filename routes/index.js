const express = require('express')
const router = express.Router()

const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

module.exports = (params) => {
    const { speakerService } = params

    router.get('/', async (req, res, next) => {
        try{
            const topSpeakers = await speakerService.getList()      
            const artworks = await speakerService.getAllArtwork() 
            res.render('layout', {template: 'home', topSpeakers, artworks})
        }catch(err){
            return next(err)
        }
    })

    router.use('/speakers', speakersRoute(params))
    router.use('/feedback', feedbackRoute(params))

    return router
}