// const express = require('express');
// const User = require('./user.model');
// const generateToken = require('../middleware/generateToken');
// const router = express.Router();


// // Register endpoint
// router.post("/register", async (req, res) => {
//     try {
//         const {username, email, password} = req.body
//         const user = new User({username, email, password})
//         await user.save();
//         res.status(201).send({message: "User registered successfully!"})
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).send({error: "Error registering user"});
//     }
// })

// // Login User endpoint
// router.post("/login", async (req, res) => {
//     const {email, password} = req.body;
//     try {
        
//     const user = await User.findOne({email});
//     if(!user) {
//         return res.status(404).send({message: "User not found"});
//     }
//     const isMatch = await user.comparePassword(password);
//     if(!isMatch) {
//         return res.status(401).send({message: "Password not match"});
//     }
//     const token = await generateToken(user._id)

//     res.cookie("token", token), {
//         httpOnly: true,
//         secure: true,
//         sameSite: "None"
//     }

//     res.status(200).send({message: "Logged in successful", token, user: {
//         _id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         profession: user.profession
//     }});
//     } catch (error) {
//         console.error("Error logged in user:", error);
//         res.status(500).send({error: "Error logged in user"});
//     }
// })

// // Logout  endpoint
// router.post('/logout', (req, res) => {
//     res.clearCookie('token');
//     res.status(200).send({message: "Logged out successfully"});
// })

// // delete a user 
// router.delete('/users/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const user = await User.findByIdAndDelete(id);
//         if (!user) {
//             return res.status(404).send({message: "User not found"});
//         }
//         res.status(200).send({message: "User deleted successfully"});
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         res.status(500).send({error: "Error deleting user"});
//     }
// })

// // Get all users 
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({}, 'id email role').sort({createdAt: -1});
//         res.status(200).send(users);
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         res.status(500).send({error: "Error fetching users"});
//     }
// })

// // update user role
// router.put('/users/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const {role} = req.body;
//         const user = await User.findByIdAndUpdate(id, {role}, {new: true});
//         if (!user) {
//             return res.status(404).send({message: "User not found"});
//         }
//         res.status(200).send({message: "User role updated successfully", user});
//     } catch (error) {
//         console.error("Error updating user role:", error);
//         res.status(500).send({error: "Error updating user role"});
//     }
// })

// // edit or update profile
// router.patch('/edit-profile', async (req, res) => {
//     try {
//         const {userId, username, bio, profession, profileImage} = req.body;
//         if(!userId) {
//             return res.status(400).send({message: "User ID is required"});
//         }
//         const user = await User.findById(userId)
        
//         if(!user) {
//             return res.status(400).send({message: "User not found"});
//         }

//         // update profile
//         if(username !== undefined) user.username = username;
//         if(profileImage !== undefined) user.profileImage = profileImage;
//         if(bio !== undefined) user.bio = bio;
//         if(profession !== undefined) user.profession = profession;

//         await user.save();
//         res.status(200).send({message: 'Profile updated successfully', user: {
//             _id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         profession: user.profession 
//         }})
//     } catch (error) {
//         console.error("Error updating user profile:", error);
//         res.status(500).send({error: "Error updating user profile"});
        
//     }
// })
    

// module.exports = router;






// const express = require('express');
// const User = require('./user.model');
// const generateToken = require('../middleware/generateToken');
// const { body, validationResult } = require('express-validator');
// const router = express.Router();

// // Register endpoint
// router.post(
//   "/register",
//   [
//     body("username").notEmpty().withMessage("Username is required"),
//     body("email").isEmail().withMessage("Valid email is required"),
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }

//     try {
//       const { username, email, password } = req.body;
//       const user = new User({ username, email, password });
//       await user.save();
//       res.status(201).send({ message: "User registered successfully!" });
//     } catch (error) {
//       console.error("Error registering user:", error.stack);
//       res.status(500).send({ error: "Error registering user" });
//     }
//   }
// );

// // Login User endpoint
// router.post(
//   "/login",
//   [
//     body("email").isEmail().withMessage("Valid email is required"),
//     body("password").notEmpty().withMessage("Password is required"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).send({ message: "User not found" });
//       }

//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(401).send({ message: "Password not match" });
//       }

//       const token = await generateToken(user._id);

//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "None",
//       });

//       res.status(200).send({
//         message: "Logged in successfully",
//         token,
//         user: {
//           _id: user._id,
//           email: user.email,
//           username: user.username,
//           role: user.role,
//           profileImage: user.profileImage,
//           bio: user.bio,
//           profession: user.profession,
//         },
//       });
//     } catch (error) {
//       console.error("Error logging in user:", error.stack);
//       res.status(500).send({ error: "Error logging in user" });
//     }
//   }
// );

// // Logout endpoint
// router.post('/logout', (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "None",
//   });
//   res.status(200).send({ message: "Logged out successfully" });
// });

// // Delete a user
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error.stack);
//     res.status(500).send({ error: "Error deleting user" });
//   }
// });

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
//     res.status(200).send(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.stack);
//     res.status(500).send({ error: "Error fetching users" });
//   }
// });

// // Update user role
// router.put('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { role } = req.body;
//     const user = await User.findByIdAndUpdate(id, { role }, { new: true });
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send({ message: "User role updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user role:", error.stack);
//     res.status(500).send({ error: "Error updating user role" });
//   }
// });

// // Edit or update profile
// router.patch('/edit-profile', async (req, res) => {
//   try {
//     const { userId, username, bio, profession, profileImage } = req.body;
//     if (!userId) {
//       return res.status(400).send({ message: "User ID is required" });
//     }
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Update profile
//     if (username !== undefined) user.username = username;
//     if (profileImage !== undefined) user.profileImage = profileImage;
//     if (bio !== undefined) user.bio = bio;
//     if (profession !== undefined) user.profession = profession;

//     await user.save();
//     res.status(200).send({
//       message: 'Profile updated successfully',
//       user: {
//         _id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         profession: user.profession,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating user profile:", error.stack);
//     res.status(500).send({ error: "Error updating user profile" });
//   }
// });

// module.exports = router;








// const express = require('express');
// const User = require('./user.model');
// const generateToken = require('../middleware/generateToken');
// const { body, validationResult } = require('express-validator');
// const router = express.Router();

// // Register endpoint
// router.post(
//   "/register",
//   [
//     body("username").notEmpty().withMessage("Username is required"),
//     body("email").isEmail().withMessage("Valid email is required"),
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }

//     try {
//       const { username, email, password } = req.body;
//       const user = new User({ username, email, password });
//       await user.save();
//       res.status(201).send({ message: "User registered successfully!" });
//     } catch (error) {
//       console.error("Error registering user:", error.stack);
//       res.status(500).send({ error: "Error registering user" });
//     }
//   }
// );

// // Login User endpoint
// router.post(
//   "/login",
//   [
//     body("email").isEmail().withMessage("Valid email is required"),
//     body("password").notEmpty().withMessage("Password is required"),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ errors: errors.array() });
//     }

//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).send({ message: "User not found" });
//       }

//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(401).send({ message: "Password not match" });
//       }

//       const token = await generateToken(user._id);

//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "None",
//       });

//       res.status(200).send({
//         message: "Logged in successfully",
//         token,
//         user: {
//           _id: user._id,
//           email: user.email,
//           username: user.username,
//           role: user.role,
//           profileImage: user.profileImage,
//           bio: user.bio,
//           profession: user.profession,
//         },
//       });
//     } catch (error) {
//       console.error("Error logging in user:", error.stack);
//       res.status(500).send({ error: "Error logging in user" });
//     }
//   }
// );

// // Logout endpoint
// router.post('/logout', (req, res) => {
//   res.clearCookie('token', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "None",
//   });
//   res.status(200).send({ message: "Logged out successfully" });
// });

// // Delete a user
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send({ message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error.stack);
//     res.status(500).send({ error: "Error deleting user" });
//   }
// });

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
//     res.status(200).send(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.stack);
//     res.status(500).send({ error: "Error fetching users" });
//   }
// });

// // // Update user role
// // router.put('/users/:id', async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const { role } = req.body;
// //     const user = await User.findByIdAndUpdate(id, { role }, { new: true });
// //     if (!user) {
// //       return res.status(404).send({ message: "User not found" });
// //     }
// //     res.status(200).send({ message: "User role updated successfully", user });
// //   } catch (error) {
// //     console.error("Error updating user role:", error.stack);
// //     res.status(500).send({ error: "Error updating user role" });
// //   }
// // });




// router.put('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { role } = req.body;

//     // Add role validation here (e.g., check if the user is an admin)
//     if (req.user.role !== 'admin') {
//       return res.status(403).send({ message: "You are not authorized to perform this action" });
//     }

//     const user = await User.findByIdAndUpdate(id, { role }, { new: true });
//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }
//     res.status(200).send({ message: "User role updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user role:", error.stack);
//     res.status(500).send({ error: "Error updating user role" });
//   }
// });


// // Edit or update profile
// router.patch('/edit-profile', async (req, res) => {
//   try {
//     const { userId, username, bio, profession, profileImage } = req.body;
//     if (!userId) {
//       return res.status(400).send({ message: "User ID is required" });
//     }
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Update profile
//     if (username !== undefined) user.username = username;
//     if (profileImage !== undefined) user.profileImage = profileImage;
//     if (bio !== undefined) user.bio = bio;
//     if (profession !== undefined) user.profession = profession;

//     await user.save();
//     res.status(200).send({
//       message: 'Profile updated successfully',
//       user: {
//         _id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         profileImage: user.profileImage,
//         bio: user.bio,
//         profession: user.profession,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating user profile:", error.stack);
//     res.status(500).send({ error: "Error updating user profile" });
//   }
// });

// module.exports = router;





// src/users/user.route.js

const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Register endpoint
router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Error registering user" });
    }
  }
);

// Login endpoint
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(401).json({ message: "Password does not match" });

      const token = await generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });

      // **Must include `_id` here:**
      res.status(200).json({
        message: "Logged in successfully",
        token,
        user: {
          _id:         user._id,
          username:    user.username,
          email:       user.email,
          role:        user.role,
          profileImage:user.profileImage,
          bio:         user.bio,
          profession:  user.profession,
        },
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Error logging in user" });
    }
  }
);


// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// (Optional) Edit or update profile
router.patch('/edit-profile', async (req, res) => {
  const { userId, username, bio, profession, profileImage } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username     !== undefined) user.username     = username;
    if (bio          !== undefined) user.bio          = bio;
    if (profession   !== undefined) user.profession   = profession;
    if (profileImage !== undefined) user.profileImage = profileImage;

    await user.save();
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id:         user._id,
        username:    user.username,
        email:       user.email,
        role:        user.role,
        profileImage:user.profileImage,
        bio:         user.bio,
        profession:  user.profession,
      }
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Error updating profile" });
  }
});

module.exports = router;
