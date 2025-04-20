// const jwt = require('jsonwebtoken');

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// const verifyToken = (req, res, next) => {
//     try {
//         const token = req.cookies.token;
        
//         if(!token){
//             return res.status(401).send({message: "Invalid token"})
//         }
//         const decoded = jwt.verify(token, JWT_SECRET);
//         if(!decoded) {
//             return res.status(401).send({message: "Invalid token or not valid"})
//         }
//         req.userId = decoded.userId;
//         req.role = decoded.role;
//         next();
//     } catch (error) {
//         console.error("Error while verifying token", error);
//         res.status(401).send({message: "Error while verifying token"})
//     }
// }

// module.exports = verifyToken;





const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // Ensure JWT_SECRET is defined
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    // Get the token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).send({ message: 'Token is missing or invalid' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: 'Invalid token or not valid' });
    }

    // Attach user information to the request object
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error('Error while verifying token:', error.message);

    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ message: 'Invalid token' });
    }

    res.status(401).send({ message: 'Error while verifying token' });
  }
};

module.exports = verifyToken;