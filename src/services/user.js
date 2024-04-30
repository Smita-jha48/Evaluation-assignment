const { passwordUtil, redisUtil} = require('../utils');
const { getCollection} = require('../middleware/dbconnection');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');
const { ObjectId } = require('mongodb');
const createUser = async ({email, password}) => {
    const users = await getCollection('users');
    try{
        const hashedPassword = await passwordUtil.hashPassword(password);
        const newUser = await users.insertOne({email: email, password: hashedPassword});
      
        return {email: email};
    }
    catch(error){
        throw error;
    }

}

const loginUser = async({email, password})=>{
     const users = await getCollection('users');
     try {
         const user = await users.findOne({email: email});
            if(!user){
                throw new CustomError('User not found', 404);
            }
            const isPasswordMatched = await passwordUtil.comparePassword(password, user.password);
            if(!isPasswordMatched){
                throw new CustomError('Invalid password', 400);
            }
           
            const token = await jwt.sign({id: user._id, email: user.email}, JWT_SECRET);
            await redisUtil.set(token);
            return {token: `Bearer ${token}`};
     }
     catch(error){
         throw error;
     }
}

const logoutUser = async(token) => {
    try{
        await redisUtil.remove(token);
        return {message: 'Logged out successfully'};
    }
    catch(error){
        throw error;
    }
}

const validateUser = async(token) => {
    try {
        const userData = await jwt.verify(token, JWT_SECRET);
        if(!userData){
            throw new CustomError('Invalid token', 401);
        }
        const tokenValue = await redisUtil.get(token);
        if(!tokenValue){
            throw new CustomError('Invalid token', 401);
        }
        return userData;
    }
    catch(error){
        throw error;
    }
}

const followUser = async({id, userId}) => {
    try {
          const followers = await getCollection('followers');
          const followStatus = await followers.insertOne({followerId: new ObjectId(id), followingId: new ObjectId(userId)})

          return {message: 'Followed successfully'};
    }
    catch(error){
        throw error;
    }
}
module.exports = { createUser, loginUser, logoutUser, validateUser, followUser };