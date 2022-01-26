const express = require('express');
const router = express.Router();
const blogger = require('../models/blogger')
const validate = require('../tools/bloggerValidation')

router.get("/", (req, res) =>{
    if(req.session.user && req.cookies.blogger_sid) {
        res.redirect('/dashboard')
    }else{
        res.render('signup')
    }
});
router.post("/", async (req, res) =>{
    try {
        console.log(req.body);
        const user = blogger.findOne(req.body.username)
        if(validate(req) && !user){
            await blogger.create({
                firstname: req.body.firstname,
                lastname : req.body.lastname,
                username: req.body.username,
                password: req.body.password,
                gender: req.body.gender,
                phone: req.body.phone
            })
            res.send('success')
        }else {
            res.redirect('/signup')
        }
       
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;