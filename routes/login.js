const router = require("express").Router();
const passport = require('passport');


router.post('/login',(req,res,next)=>{
    const {username,password}=req.body
    if(!username || !password){
        // req.flash('error','please fill up the password feild');
        // res.render('login',{msgErr: req.flash('error')})
        res.status(200).json({
            msg: 'this is login route',
            description: 'Please Enter your username and password'
        });
        res.end();
    }
    else{
        passport.authenticate('local',{
            successRedirect: '/profile',
            failureRedirect: '/user/login',
        })(req,res,next)
    }
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/user/login');
});

// ---------------

router.get('/profile',(req,res)=>{
    var user = req.user;
    // res.render("profile",{user})
    console.log("profile "+user)
    res.status(200).json({
        msg: 'this is profile route'
    });
    res.end();
})

module.exports = router;