// const jwt = require('jsonwebtoken');
// const User = require('../users/user.model');

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// const generateToken = async (userId) => {
// try {
//     const user = await User.findById(userId);
//     if (!user) {
//         throw new Error('User not found');
//     }
//     const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET, { expiresIn: '1h' })
//     return token;
// } catch (error) {
    
// }
// }

// module.exports = generateToken





const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    // Ensure JWT_SECRET is defined
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate the token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return token;
  } catch (error) {
    console.error('Error generating token:', error.message);
    throw new Error('Failed to generate token');
  }
};

module.exports = generateToken;