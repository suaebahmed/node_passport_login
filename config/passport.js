const User = require("../models/user");
const localStrategy =require('passport-local').Strategy;
const bcrypt  = require('bcrypt');

module.exports = function(passport){
    passport.use(new localStrategy(function(username,password,done){

        User.findOne({username: username},(err,user)=>{
            if(err){
                return done(null,err);
            }
            else if(!user){
                return done(null,false,{message: 'Incorrect username'});
            }
            else{
                bcrypt.compare(password,user.password,(err,match)=>{
                    if(err)
                        return done(null,err);
                    else if(!match){
                        return done(null,false,{message: 'Incorrect password'});
                    }
                    else{
                        return done(null,user);
                    }
                })
            }
        })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}