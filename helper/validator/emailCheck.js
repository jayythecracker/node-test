// helper/validator/emailCheck.js

const User = require('../../models/userModel');
const checkEmailNotInUse = async (email) => {
  try {
    // Fetch users from your database
   
    const users=await User.find();

    const userWithEmail =users.find(u => u.email == email);
    


    if (userWithEmail) {
      throw new Error('E-mail already in use');
    }
  } catch (error) {
    throw new Error(error); // Handle database errors gracefully
  }
};

module.exports = checkEmailNotInUse;
