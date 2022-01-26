const express = require('express');
const router = express.Router();
const blogger = require('../models/blogger')
const validate = require('../tools/bloggerValidation')

router.get('/', (req,res) =>{
    if(req.session.user && req.cookies.blogger_sid){
        const user = req.session.user;
        res.render('dashboard', {user});
    }else{
        res.redirect('/login')
    }
})

router.post("/", async (req, res) => {
    try {
      let user = false;
      if (req.body.username != req.session.user.username) {
        user = await blogger.findOne(req.body.username);
      }
      if (validate(req) && !user) {
        const newUser = await blogger.findByIdAndUpdate(
          req.session.user._id,
          req.body,
          { new: true }
        );
        req.session.user = newUser;
        res.redirect("/dashboard");
      } else {
        res.redirect("/dashboard");
      }
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;