const User = require("../models/user");
const bcrypt = require('bcryptjs');
// const verifyToken = require("../middlewares/token");
const jwt = require("jsonwebtoken");
const jwtKey = "assign";


exports.signup = async(req,res)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(422).json({message:"Plz include all the fields"})
    }

    let existUser = await User.findOne({email:req.body.email})
    if(existUser){
        return res.status(400).json({messsage:"User already Exist"})
    }
    const user = new User({name,email,password});

    const salt = await bcrypt.genSalt(10);
    //hasing the password
    user.password = await bcrypt.hash(user.password,salt);   
    let result = await user.save();
    if(result){
        jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                return res.status(400).json({message:"something went wrong"})
            }
        return res.send({result,auth:token})
        })
    }else{
     res.status(400).json({message:"Unable to Save User in DB"})
    }

}


exports.signin = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({mesage:"plz include all the fields"})
    }
   let user = await User.findOne({email:req.body.email});
    if(user){
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(validPassword){
             jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    return res.json({message:"something went wrong"})
                }
             res.send({user,auth:token});

             })
        }else{
            return res.status(400).json({mesage:"Invalid credential"})
        }
    }else{
        return res.status(400).json({mesage:"unable to login"})
        
    }
}






exports.updateDetails = async(req,res)=>{
  let emailExist = await User.findOne({email:req.body.email})
  if(emailExist){
    return res.json({message:"User already exist"})
  }
  let result = await User.updateOne(
    {_id:req.params.id},
    {$set:req.body}
  );
  res.json({result});
}

//getAll user details
exports.getAllUser = async(req,res)=>{
    let user= await User.find().lean();
    if(user.length>0){
        res.send(user);
    }else{
        res.json({message:"No User in a DB"})
    }
}

//delete User
  exports.deleteUser = async(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    let user = await User.findByIdAndRemove(id);
    if(!user){
        return res.status(400).json({message:"unable to delete"})
    }else{
        return res.status(200).json({message:"Succesfully deleted"})
    }
}
