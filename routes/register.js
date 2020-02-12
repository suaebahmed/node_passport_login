const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

router.post('/register',(req,res)=>{

    var {name,username,email,password,password2}=req.body;
    const error = [];
    if(!name || !username || !email || !password || !password2){
        error.push({msg: 'fill up all the feild'})
    }
    if(password!==password2){
        error.push({msg: 'password should be equal'});
    }
    if(error.length > 0){
        // res.render('register',{error});
        var result=error.map((err,id)=>{
            return{
                Error: err.msg+" "+id
            }
        })
        res.status(200).json({
            msg: 'this is register page',
            result: result
        });
    }
    else{
        User.findOne({email: email},(err,user)=>{
            if(err){
                res.status(500).json({
                    msg: 'server error',
                    error: err
                });
            }
            else if(user){
                // error.push({msg: 'password already exist'});
                // // res.render('register',{error});
                // res.status(500).json({
                //     msg: 'this is register page',
                //     result: error.map(err,id=>{
                //         return{
                //             Error: err+" "+id
                //         }
                //     })
                // })
                res.status(200).json({
                    msg : 'email already exist'
                });
                console.log(user)
                res.end();
            }
            else{
                bcrypt.genSalt(10,(err,selt)=>{
                    bcrypt.hash(password,selt,(is,hash)=>{
                        if(err)
                            res.status(500).json({error: err})
                        else{
                            var newUser= new User({
                                name: name,
                                username: username,
                                email: email,
                                password: password,
                            });
                            console.log(newUser)
                            newUser.password = hash;
                            newUser.save(err=>{
                                if(err){
                                    res.status(500).json({error: err})
                                }
                                else{
                                    req.flash('success','you are now our member and you can login');
                                    res.redirect('/user/login');
                                }
                            })
                        }
                    })
                })
            }
        })
    }
});

module.exports = router;