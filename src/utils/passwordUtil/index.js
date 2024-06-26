const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;

};

const comparePassword = async(password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

module.exports = {hashPassword, comparePassword};