const {CustomError} = require('../utils');
const {userService} = require('../services')
const register = async(req, res) => {

    try {
    const {email, password} = req.body;
    const newUser = await userService.createUser({email, password});
    res.status(201).json({
      data: newUser
    });

  }
  catch(error) {
    if(error instanceof CustomError) {
      res.status(error.status).json({
        error:error.message
      });
      return;
    }
    res.status(500).json({
      error: error.message
    });
  }
};

const login = async(req, res) => {
  try {
       const {email, password} = req.body;
       const user = await userService.loginUser({email, password});
        res.status(200).json({
          data: user
        });
  }
  catch(error) {
    if(error instanceof CustomError){
      return res.status(error.status).json({
        error: error.message
      });
    }
      return res.status(500).json({
        error: error.message
      })
  }
}

const logout = async(req, res) => {
  try{
    const token= req.headers.authorization.split('')[1];
    const userData = await userService.logoutUser(token);
    res.status(200).json({
      data: userData
    });
  }
  catch(error){
    if(error instanceof CustomError){
      return res.status(error.status).json({
        error: error.message
      });
    }
    return res.status(500).json({
      error: error.message
    });
  }
}

const validate = async(req, res) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    const userData = await userService.validateUser(token);
    res.status(200).json({
      data: userData
    });
  }
  catch(error){
    if(error instanceof CustomError){
      return res.status(error.status).json({
        error: error.message
      });
    }
    return res.status(500).json({
      error: error.message
    });
  }
}

const follow = async(req, res) => {
  try {
    const {id} = req.user;
    const {userId} = req.body;
    const followUser = await userService.followUser({id, userId});

    return res.status(200).json({
      data: followUser
    
    })

  }
  catch(error){
    if(error instanceof CustomError){
      return res.status(error.status).json({
        error: error.message
      });
    }
    return res.status(500).json({
      error: error.message
    });

  }
}

module.exports = {register, login, logout, validate, follow}