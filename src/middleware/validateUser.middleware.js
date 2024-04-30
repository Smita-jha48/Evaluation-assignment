const jwt = require('jsonwebtoken');
const  {JWT_SECRET} = require('../config');
const {redisUtil} = require('../utils');

const validateUser = async(req, res, next) => {
     const { authorization } = req.headers;
    if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
   }
    try {
        const token = authorization.split(' ')[1];
       const userData = await jwt.verify(token, JWT_SECRET);
        if(!userData){
            throw new CustomError('Invalid token', 401);
        }
        const tokenValue = await redisUtil.get(token);
        if(!tokenValue){
            throw new CustomError('Invalid token', 401);
        }
        req.user = {id: userData.id};
        return next();
    }
    catch (error) {
    return res.status(401).json({ message: error.message });
  }
};


module.exports = {validateUser};