// const express = require('express');
// const Reviews = require('./reviews.model');
// const Product = require('../products/products.model');
// const router = express.Router();

// // post a new review
// router.post('/post-review', async (req, res) => {
//     try {
//         const {comment, rating, productId, userId} = req.body;

//         if (!comment || !rating || !productId || !userId) {
//             return res.status(400).send({ message: "All fields are required" });
//         }
//         const existingReview = await Reviews.findOne({productId, userId})

//         if (existingReview) {
//             // update review
//             existingReview.comment = comment;
//             existingReview.rating = rating;
//             await existingReview.save();
//         } else {
//             // create new review
//             const newReviev = new Reviews({
//                 comment, rating, productId, userId
//             })
//             await newReviev.save();
//         }

//         // calculate the average rating
//         const reviews = await Reviews.find({ productId });
//         if(reviews.length > 0) {
//             const totalRting = reviews.reduce((acc, review) => acc + review.rating, 0);
//             const averageRating = totalRting / reviews.length;
//             const product = await Product.findById(productId)
//             if(product) {
//                 product.rating = averageRating;
//                 await product.save({ validateBeforeSave: false });
//             } else {
//                 return res.status(404).send({ message: "Product not found" });
//             }
//         }

//         res.status(200).send({ message: "Review processed successfully", reviews: reviews });


//     } catch (error) {
//         console.error("Error posting review:", error);
//         res.status(500).send({ message: "Failed to post review"});
//     }
// });

// // get all reviews with count
// router.get('/total-reviews', async (req, res) => {
//     try {
//         const totalReviews = await Reviews.countDocuments({});
//         res.status(200).send({ totalReviews });
//     } catch (error) {
//         console.error("Error getting total review:", error);
//         res.status(500).send({ message: "Failed to get review count"});
        
//     }
// })

// // get all reviews by userId
// router.get('/userId', async (req, res) => {
//     const { userId } = req.params;
//     if(!userId) {
//         return res.status(400).send({ message: "User ID is required" });
//     }
//     try {
//         const reviews = await Reviews.find({ userId: userId}).sort({ createAt: -1});
//         if (reviews.length === 0) {
//             return res.status(404).send({ message: "No reviews found for this user" });
//         }
//     } catch (error) {
//         console.error("Error getting reviews by user:", error);
//         res.status(500).send({ message: "Failed to get reviews by user"});
        
//     }
// })


// module.exports = router;



const express = require('express');
const mongoose = require('mongoose');
const Reviews = require('./reviews.model');
const Products = require('../products/products.model');

const router = express.Router();

// POST add/update review
router.post('/post-review', async (req, res) => {
  console.log("Incoming Payload:", req.body);  // 🔍 must show { comment, rating, userId, productId }

  const { comment, rating, userId, productId } = req.body;
  if (!comment || rating == null || !userId || !productId) {
    return res.status(400).json({
      message: 'All fields are required',
      received: { comment, rating, userId, productId }
    });
  }

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({ message: 'Invalid IDs' });
  }

  try {
    let review = await Reviews.findOne({ userId, productId });
    if (review) {
      review.comment = comment;
      review.rating  = rating;
      await review.save();
    } else {
      review = await Reviews.create({ comment, rating, userId, productId });
    }

    // Recalculate average rating
    const all = await Reviews.find({ productId });
    const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;
    await Products.findByIdAndUpdate(productId, { rating: avg });

    res.status(200).json({ message: 'Review processed', review });
  } catch (err) {
    console.error('Review Error:', err);
    res.status(500).json({ message: 'Failed to post review' });
  }
});


// GET user reviews
router.get('/user-reviews/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const reviews = await Reviews.find({ userId }).sort({ createdAt: -1 });
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }
    res.json({ reviews });
  } catch (err) {
    console.error('Error getting user reviews:', err.message);
    res.status(500).json({ message: 'Failed to get reviews' });
  }
});

module.exports = router;
