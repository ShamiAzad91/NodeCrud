const jwt = require("jsonwebtoken");
const jwtKey = "assign";

const verifyToken = (req,res,next)=>{
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
    console.log("middleWare called  here",token)

    jwt.verify(token,jwtKey,(err,valid)=>{
        if(err){
            return res.status(401).json({message:"Plz provide valid token"})
        }else{
            next();
        }
    })
        
    }else{
      return  res.send({message:"plz add the token"})
    }
}

module.exports = verifyToken;