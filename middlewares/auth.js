const jwt= require('jsonwebtoken');
const configkey = require('../config/secreatekey');

const veryfyToken = async(req, res,next)=>{
    const token = req.body.token || req.query.token || req.headers["authorization"]
    if(!token){
        res.status(200).send({code:"200", message:" A token is required"})
    }
    try {
      const decode =  jwt.verify(token,configkey.secret_key)
     req.user = decode
    } catch (error) {
        res.status(400).send({code:"400", message:" Invalid token" })   
    }
  return next();
}

module.exports = veryfyToken
