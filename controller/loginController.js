const User=require("../models/People");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const createError = require("http-errors");

function getLogin(req,res,next)
{
    res.render('index');
}
//do login
async function login(req,res,next){
    try {
        const user=await User.findOne({
            $or: [{email:req.body.username},{mobile:req.body.username}]
        });
        if(user && use.id){
            const isValidPassword= await bcrypt.compare(req.body.password,user.password)
        
        if(isValidPassword){
            const userObject={
                username:user.name,
                mobile:user.mobile,
                email:user.email,
                role:"user"
            }

            //generate token
            const token=jwt.sign(userObject,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
            //set the cookie
            res.cookie(process.env.COOKIE_NAME,token,{
                maxAge:JWT_EXPIRE,
                httpOnly:true,
                signed:true,
            })
            res.locals.loggedInUser=userObject;

            res.render("inbox")
        }
        else{
            throw createError("Login failed! Please try again.");
        }
    }
    else{
        throw createError("Login failed! Please try again.");
    }
    } catch (err) {
        res.render("index", {
            data: {
              username: req.body.username,
            },
            errors: {
              common: {
                msg: err.message,
              },
            },
          });
    }
}

module.exports={
    getLogin,
    login,
}