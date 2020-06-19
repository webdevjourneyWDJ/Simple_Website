const express = require('express')
const router = express.Router()

module.exports = (params) => {
    const {feedbackService} = params
    
    router.get('/', async (req, res, next) => {
        try{ 
            const feedbacks = await feedbackService.getList()
            return res.json(feedbacks)
        }catch(err){
            return next(err)
        }
    })

    router.post('/', (req, res) => {
        res.send('Feedback post sent')
    })

    return router
}