// const {Schema, model} = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new Schema({
//     username: {type: String, required: true, unique: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     role: {
//         type: String, default: "user"
//     },
//     profileImage: String,
//     bio: {type: String, maxlength: 200},
//     profession: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // hashing passwords
// userSchema.pre('save', async function(next){
//     const user = this;
//     if(!user.isModified("password")) return next();
//     const hashedPassword = await  bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     next();
// })

// // match passwords
// userSchema.methods.comparePassword = function(candidatepassword) {
//     return bcrypt.compare(candidatepassword, this.password);
// }

// const User = model('User', userSchema);
// module.exports = User;





// const { Schema, model } = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, default: "user" },
//   profileImage: String,
//   bio: { type: String, maxlength: 200 },
//   profession: String,
//   createdAt: { type: Date, default: Date.now },
// });

// // Hashing passwords before saving
// userSchema.pre('save', async function (next) {
//   try {
//     const user = this;
//     if (!user.isModified("password")) return next();
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     user.password = hashedPassword;
//     next();
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     next(error); // Pass the error to the next middleware
//   }
// });

// // Compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (error) {
//     console.error("Error comparing password:", error);
//     throw new Error("Password comparison failed");
//   }
// };

// const User = model('User', userSchema);
// module.exports = User;



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username:    { type: String, required: true, unique: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  role:        { type: String, default: 'user' },
  profileImage:{ type: String },
  bio:         { type: String, maxlength: 200 },
  profession:  { type: String }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
