const express = require ('express');
const router = express.Router();
const User = require("../models/User")
const bcryptjs = require('bcryptjs');
const nodemailer = require("nodemailer");


router.post('/signup', (req, res, next) => {
    const saltRounds = 12;
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(req.body.password, salt))
    .then(hashedPassword => {
        User.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        })
        .then((newUser) =>{
            res.json({message: "Successfully signed up new account"});
        })
        .catch((err) =>{
            res.json(err)
        })
    })
});


router.post('/login', (req, res, next) => {
    if (req.body.username === '' || req.body.password === '') {
        res.json({error: "fields cannot be left blank"})
        return;
    }

    User.findOne({ username: req.body.username })
    .then(resultFromDB => {
        if (!resultFromDB) {
            res.json({error: "Username & Password combination not correct"});
            return;
        } else if (bcryptjs.compareSync(req.body.password, resultFromDB.password)) {
            req.session.currentlyLoggedIn = resultFromDB;
            res.json({message: "Succesfully logged in"});
            return;
        } else {
            res.json({error: "Username & Password combination not correct"});
        }
    })
    .catch(error => console.log(error));
});


function serializeTheUserObject (userObj){
    let result = {};
    if(userObj.username) result.username = userObj.username;
    if(userObj.email) result.email = userObj.email;
    return result;
}

router.get('/serializeuser', (req, res, next) => {
    console.log(req.session);
    console.log(req.session.currentlyLoggedIn);

    if(!req.session.currentlyLoggedIn) res.json(null);

    User.findById(req.session.currentlyLoggedIn._id).populate('location')
    .then((theUser) => {
        res.json(serializeTheUserObject(theUser))
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) console.log(err);
        res.json({message: "Successfully logged out"})
    });
})

module.exports = router;