// const  mongoose = require('mongoose');

// const ReviewSchema = new mongoose.Schema({
    
//     Comment: { type: String, required: true },
//     Rating: { type: Number, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
// }, {timestamps: true})

// const Reviews = mongoose.model('Review', ReviewSchema);

// module.exports = Reviews;





// const mongoose = require('mongoose');

// const ReviewSchema = new mongoose.Schema({
//     comment: { type: String, required: true },  // Changed from Comment to comment
//     rating: { type: Number, required: true },   // Changed from Rating to rating
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
// }, { timestamps: true });

// const Reviews = mongoose.model('Review', ReviewSchema);

// module.exports = Reviews;


// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   comment:   { type: String, required: true },
//   rating:    { type: Number, required: true },
//   userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Review', reviewSchema);




const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  comment:   { type: String, required: true },
  rating:    { type: Number, required: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
