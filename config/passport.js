let passport = require('passport');
let User = require('../models/user');
let LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:4});
    let errors = req.validationErrors();
    if( errors){
        let messages = [];
        errors.forEach(function(error){
            messages.push(error.msg)
        });
        return done(null,false, req.flash('error', messages))
    }
    User.findOne({'email':email}, (err,user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'E-mail is already in Use!'});
        }
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err,result)=>{
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();
    let errors = req.validationErrors();
    if( errors) {
        let messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg)
        });
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email':email}, function(err,user){
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No User found!'});
        }
        if(!(user.validPassword(password))){
            return done(null, false, {message: 'Wrong Password!'});
        }
        return done(null, user);
    });
}));


