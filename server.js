const express = require('express')
const path = require('path')

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakerService = new SpeakerService('./data/speakers.json')

const routes = require('./routes')

const app = express()
const port = 4000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "./views"))

app.locals.siteName = "Art Meetups"

app.use(express.static(path.join(__dirname, "./static")))

app.use(async (req, res, next) => {
    try{
        const names = await speakerService.getNames();
        res.locals.speakerNames = names
        return next()
    }catch(err){
        return next(err)
    }
})

app.use('/', routes({
    feedbackService, 
    speakerService
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)    
})