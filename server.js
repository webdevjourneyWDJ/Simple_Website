const express = require('express')
const path = require('path')
const createError = require('http-errors')
const cookieSession = require('cookie-session')

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakerService = new SpeakerService('./data/speakers.json')

const routes = require('./routes')

const app = express()
const port = 4000

app.locals.siteName = "Art Meetups"

app.use(
    cookieSession({
        name: 'session',
        keys: ['FGD456d45fgh', 'GR64dh654h']
    })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "./views"))
app.use(express.urlencoded({extended: true}))
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

app.use((req, res, next) => {
    return next(createError(404, "File not found"))
})

app.use((err, req, res, next) => {
    console.log(err)
    res.locals.message = err.message
    const status = err.status || 500
    res.locals.status = status
    res.status(status)
    res.render('error')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)    
})