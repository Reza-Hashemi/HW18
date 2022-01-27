var express = require("express");
var router = express.Router();
const blogger = require("../models/blogger");
const validate = require("../tools/bloggerValidation");

router.get("/", (req, res) => {
  if (req.session.user && req.cookies.blogger_sid) {
    res.redirect("/dashboard");
  } else {
    res.render("signup", { msg: null });
  }
});
// router.post("/", async (req, res) =>{
//     try {
//         console.log(req.body);
//         const user = blogger.findOne(req.body.username)
//         if(validate(req) && !user){
//             await blogger.create({
//                 firstname: req.body.firstname,
//                 lastname : req.body.lastname,
//                 username: req.body.username,
//                 password: req.body.password,
//                 gender: req.body.gender,
//                 phone: req.body.phone
//             })
//             res.send('success')
//         }else {
//             res.redirect('/signup')
//         }

//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
//-------------------------------------------------------
router.post("/", (req, res) => {
  console.log(req.body);
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.password ||
    !req.body.phone
  ) {
    return res.render("signup", { msg: "fill the inputs" });
  }

  if (req.body.password.length < 8) {
    return res.render("signup", { msg: "password is no aceptable" });
  }

  blogger.findOne({ username: req.body.username.trim() }, (err, existUser) => {
    if (err) {
      return res.render("signup", { msg: "username is not acceptable" });
    }

    if (existUser) {
      return res.render("signup", { msg: "username already token" });
    }

    const NEW_BLOGGER = new blogger({
      username: req.body.username,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      password: req.body.password,
      phone: req.body.phone,
      gender: req.body.gender,
    });

    NEW_BLOGGER.save((err, user) => {
      if (err) {
        return res.render("signup", { msg: err.message });
      }

      res.redirect("/login");
    });
  });
});

module.exports = router;
