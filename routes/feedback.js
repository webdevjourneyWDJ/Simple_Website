const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')

const validationArr = [
    check('name')
        .trim()
        .isLength({min: 3})
        .escape()
        .withMessage('A name is required'),
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email is required'),
    check('title')
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage('A title is required'),
    check('message')
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage('A message is required'),
];

module.exports = (params) => {
    const {feedbackService} = params
    
    router.get('/', async (req, res, next) => {
        try{ 
            const feedbacks = await feedbackService.getList()

            const errors = req.session.feedback ? req.session.feedback.errors : false
            const successMsg = req.session.feedback ? req.session.feedback.message : false
            req.session.feedback = {}

            return res.render('layout', {template: 'feedback', feedbacks, errors, successMsg})
        }catch(err){
            return next(err)
        }
    })

    router.post('/',validationArr, async (req, res) => {
        try{
            const errors = validationResult(req)    
        
            if(!errors.isEmpty()) {
                req.session.feedback = {
                    errors: errors.array()
                }
    
                return res.redirect('/feedback')
            }
    
            const {name, email, title, message} = req.body
            await feedbackService.addEntry(name, email, title, message)
            req.session.feedback = {
                message: 'Thank you for your feedback'
            }
            
            return res.redirect('/feedback')
        }catch(err){
            return next(err)
        }
    })

    router.post('/api', validationArr, async(req, res, nexy) => {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.json({errors: errors.array()})
            }

            const {name, email, title, message} = req.body
            await feedbackService.addEntry(name, email, title, message)
            
            const feedback = await feedbackService.getList()
            return res.json({feedback, successMessage: "Thank you for your feedback"})

        }catch(err){
            return next(err)
        }
    })

    return router
}