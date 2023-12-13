const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('./auth/login');
})
router.get('/register', (req, res) => {
    res.render('./auth/register');
})

router.post('/register', async (req, res) => {
    const { username, email, role, password } = req.body;
    const user = new User({ username, email, role });
    const newuser = await User.register(user, password);       //register function came using passport
    await newuser.save();

    req.flash('info', 'Successfully Registered');
    res.redirect('/login');
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        req.flash('info',`Logged in Successfully. Welcome ${req.user.username} !`);
        res.redirect('/dishes')
    })

router.get('/logout',(req, res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});  

module.exports = router;