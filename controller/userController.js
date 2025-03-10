const bcrypt=require("bcrypt");
const User=require("../models/People");
const path = require("path");
const {unlink}=require("fs");
async function getUsers(req,res,next)
{
    try {
        const users= await User.find();
        res.render('users',{
            users: users,
        });
    } catch (error) {
        next(error)
    }

}

async function addUser(req,res,next)
{
    let newUser;
    const hashPassword=await bcrypt.hash(req.body.password,10);
    if(req.files && req.files.length>0)
    {
        newUser=User({
            ...req.body,
            avatar:req.files[0].filename,
            password:hashPassword
        });
    }
    else{
        newUser=User({
            ...req.body,
            password:hashPassword
        });
    }

    //save the database
    try {
        const result=await newUser.save();
        res.status(200).json({
            message: "User was added successfully"
        })
    } catch (error) {
        res.status(500).json({
            errors:{
                common:{
                    msg : "Unknown error occurred ! "
                }
            }
        })
    }
}

// remove user
async function removeUser(req, res, next) {
    try {
      const user = await User.findByIdAndDelete({
        _id: req.params.id,
      });
       
      // remove user avatar if any
      console.log(user.avatar)
      if (user.avatar) {
        unlink(
          path.join(__dirname,`/../public/uploads/avatars/${user.avatar}`),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
  
      res.status(200).json({
        message: "User was removed successfully!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: {
          common: {
            msg: "Could not delete the user!",
          },
        },
      });
    }
  }

module.exports={
    getUsers,
    addUser,
    removeUser

}