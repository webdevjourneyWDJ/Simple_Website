const express = require('express')
const router = express.Router()

module.exports = (params) => {
    const {speakerService} = params
    
    router.get('/', async (req, res, next) => {
        try{
            const speakers = await speakerService.getList()
            const artworks = await speakerService.getAllArtwork()  
            res.render("layout", {template: "speakers", speakers, artworks})
        }catch(err){
            return next(err)
        }
    })

    router.get('/:shortname', async (req, res, next) => {
        try{
            const speaker = await speakerService.getSpeaker(req.params.shortname)
            const artworks = await speakerService.getArtworkForSpeaker(req.params.shortname)  
            res.render("layout", {template: "speaker-detail", speaker, artworks})
        }catch(err){
            return next(err)
        }
    })

    return router
}