var express = require('express');
var router = express.Router();
const blogger = require('../models/blogger')

router.get('/', (req,res)=>{
    if(req.session.user && req.cookies.blogger_sid) {
        res.redirect('/dashboard')
    }else{
        res.render('login')
    }
    
})

router.post('/', async (req, res) =>{
    try {
        const user = await blogger.findOne({
            username : req.body.username,
            password: req.body.password
        });
        if(user) {
            req.session.user = user;
            res.redirect('/dashboard')
        }else{
            res.send("failed")
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;