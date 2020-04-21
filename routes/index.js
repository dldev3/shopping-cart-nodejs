var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/', function(req,res,next){
  Product.find(function(err,docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i< docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    //console.log(productChunks);    
    res.render('shop/index', {
     productChunks
    });
  });
});


router.get('/user/signup', (req,res,next) => {
  let messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true

}));

router.get('/user/profile', (req,res,next)=>{
  res.render('user/profile');
});

module.exports = router;