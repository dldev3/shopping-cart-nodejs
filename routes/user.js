var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

/**get Profile Page*/
router.get('/profile', isLoggedIn ,(req,res,next)=>{
    res.render('user/profile');
});

router.get('/logout', isLoggedIn ,function(req,res,next){
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req,res,next){
    next();
});

/**get Sign Up Page*/
router.get('/signup', (req,res,next) => {
    let messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true

}));

/**get Sign In Page*/
router.get('/signin', (req,res,next) => {
    let messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

module.exports = router;

function isLoggedIn (req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn (req,res,next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}