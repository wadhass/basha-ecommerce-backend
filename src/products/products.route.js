// const express = require('express');
// const Products = require('./products.model');
// const Reviews = require('../reviews/reviews.model'); // ✅ adjust the path if needed
// const verifyToken = require('../middleware/verifyToken');
// const verifyAdmin = require('../middleware/verifyAdmin');


// const router = express.Router();

// // POST: Create a new product
// router.post('/create-product', async (req, res) => {
//   try {
//     const newProduct = new Products({
//       ...req.body
//     });

//     const savedProduct = await newProduct.save();

//     // If you intended to calculate review average, this assumes there are reviews in the same collection.
//     // Usually reviews are separate, but if you're storing multiple reviews per product here, update accordingly.

//     const reviews = await Products.find({ productId: savedProduct._id });

//     if (reviews.length > 0) {
//       const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
//       const averageRating = totalRating / reviews.length;
//       savedProduct.rating = averageRating;
//       await savedProduct.save();
//     }

//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Error creating new product:", error);
//     res.status(500).json({ message: 'Failed to create new product' });
//   }
// });

// // GET:  all products 
// router.get('/', async (req, res) => {
//   try {
//     const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

//     let filter = {};

//     if (category && category !== 'all') {
//       filter.category = category;
//     }

//     if (color && color !== 'all') {
//       filter.color = color;
//     }

//     if (minPrice || maxPrice) {
//       const min = parseFloat(minPrice) || 0;
//       const max = parseFloat(maxPrice);
//       if (!isNaN(max)) {
//         filter.price = { $gte: min, $lte: max };
//       }
//     }

//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const totalProducts = await Products.countDocuments(filter);
//     const totalPages = Math.ceil(totalProducts / parseInt(limit));

//     const products = await Products.find(filter)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .populate('author', 'name email')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       products,
//       totalProducts,
//       totalPages,
//       currentPage: parseInt(page),
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// // get a single product
// router.get('/:id', async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const product = await Products.findById(productId).populate("author", "email username");
//         if(!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         const reviews = await Reviews.find({productId}).populate("author", "email username");
//         res.status(200).json({ product, reviews });
//     } catch (error) {
//         console.error("Error fetching the product:", error);
//         res.status(500).json({ message: 'Failed to fetch the product' });
        
//     }
// })

// // update a product
// router.patch('/update-product/:id', verifyToken, verifyAdmin, async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const updateProduct = await Products.findByIdAndUpdate(productId, {...req.body}, {new: true})

//         if(!updateProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         res.status(200).json({
//             message: 'Product updated successfully',
//              product: updateProduct 
//             });
//     } catch (error) {
//         console.error("Error updating the product:", error);
//         res.status(500).json({ message: 'Failed to update the product' });
        
//     }
// })

// // delete a product
// router.delete('/:id', async (req, res) => {
//     try {
//       const productId = req.params.id;
//       const deletedProduct = await Products.findByIdAndDelete(productId);
  
//       if (!deletedProduct) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       // Delete reviews related to the product
//       await Reviews.deleteMany({ productId });
  
//       res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//       console.error("Error deleting the product:", error);
//       res.status(500).json({ message: 'Failed to delete the product' });
//     }
//   });

//   // get related products
//   router.get('/related/:id', async (req, res) => {
//     try {
//         const {id} = req.params;

//         if(!id) {
//             return res.status(400).json({ message: 'Product ID is required' });
//         }
//         const product = await Products.findById(id);
//         if(!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         const titleRegex = new RegExp(
//             product.name.
//             split("")
//             .filter((word) => word.length > 1)
//             .join("|"), 
//             'i'
//         );

//         const relatedProducts = await Products.find({
//             _id: { $ne: id },
//            $or: [
//             {name: {$regex: titleRegex}},
//             {category: product.category},
//            ]
//         })

//         res.status(200).json(relatedProducts);
//     } catch (error) {
//         console.error("Error fetching related products:", error);
//         res.status(500).json({ message: 'Failed to fetch related products' });
        
//     }
//   })
  

// module.exports = router;





// const express = require('express');
// const Products = require('./products.model');
// const Reviews = require('../reviews/reviews.model'); // ✅ adjust the path if needed
// const verifyToken = require('../middleware/verifyToken');
// const verifyAdmin = require('../middleware/verifyAdmin');

// const router = express.Router();

// // POST: Create a new product
// router.post('/create-product', async (req, res) => {
//   try {
//     const newProduct = new Products({
//       ...req.body
//     });

//     const savedProduct = await newProduct.save();

//     // Calculate the average rating if there are reviews
//     const reviews = await Reviews.find({ productId: savedProduct._id });

//     if (reviews.length > 0) {
//       const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
//       const averageRating = totalRating / reviews.length;
//       savedProduct.rating = averageRating;
//       await savedProduct.save();
//     }

//     res.status(201).json(savedProduct);
//   } catch (error) {
//     console.error("Error creating new product:", error);
//     res.status(500).json({ message: 'Failed to create new product' });
//   }
// });

// // GET: All products
// router.get('/', async (req, res) => {
//   try {
//     const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

//     let filter = {};

//     if (category && category !== 'all') {
//       filter.category = category;
//     }

//     if (color && color !== 'all') {
//       filter.color = color;
//     }

//     if (minPrice || maxPrice) {
//       const min = parseFloat(minPrice) || 0;
//       const max = parseFloat(maxPrice);
//       if (!isNaN(max)) {
//         filter.price = { $gte: min, $lte: max };
//       }
//     }

//     const skip = (parseInt(page) - 1) * parseInt(limit);
//     const totalProducts = await Products.countDocuments(filter);
//     const totalPages = Math.ceil(totalProducts / parseInt(limit));

//     const products = await Products.find(filter)
//       .skip(skip)
//       .limit(parseInt(limit))
//       .populate('author', 'name email')
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       products,
//       totalProducts,
//       totalPages,
//       currentPage: parseInt(page),
//     });

//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: 'Failed to fetch products' });
//   }
// });

// // GET: Single product
// router.get('/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const product = await Products.findById(productId).populate("author", "email username");
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     const reviews = await Reviews.find({ productId }).populate("author", "email username");
//     res.status(200).json({ product, reviews });
//   } catch (error) {
//     console.error("Error fetching the product:", error);
//     res.status(500).json({ message: 'Failed to fetch the product' });
//   }
// });

// // PATCH: Update product
// router.patch('/update-product/:id', verifyToken, verifyAdmin, async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updatedProduct = await Products.findByIdAndUpdate(productId, { ...req.body }, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     res.status(200).json({
//       message: 'Product updated successfully',
//       product: updatedProduct
//     });
//   } catch (error) {
//     console.error("Error updating the product:", error);
//     res.status(500).json({ message: 'Failed to update the product' });
//   }
// });

// // DELETE: Delete a product
// router.delete('/:id', async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const deletedProduct = await Products.findByIdAndDelete(productId);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Delete reviews related to the product
//     await Reviews.deleteMany({ productId });

//     res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error("Error deleting the product:", error);
//     res.status(500).json({ message: 'Failed to delete the product' });
//   }
// });

// // GET: Related products
// router.get('/related/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: 'Product ID is required' });
//     }

//     const product = await Products.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const titleRegex = new RegExp(
//       product.name.split("").filter((word) => word.length > 1).join("|"),
//       'i'
//     );

//     const relatedProducts = await Products.find({
//       _id: { $ne: id },
//       $or: [
//         { name: { $regex: titleRegex } },
//         { category: product.category },
//       ]
//     });

//     res.status(200).json(relatedProducts);
//   } catch (error) {
//     console.error("Error fetching related products:", error);
//     res.status(500).json({ message: 'Failed to fetch related products' });
//   }
// });

// module.exports = router;



const express = require('express');
const mongoose = require('mongoose');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (category && category !== 'all') filter.category = category;
    if (color    && color    !== 'all') filter.color    = color;
    if (minPrice || maxPrice) {
      const min = parseFloat(minPrice) || 0, max = parseFloat(maxPrice);
      if (!isNaN(max)) filter.price = { $gte: min, $lte: max };
    }

    const skip         = (page-1)*limit;
    const totalProducts= await Products.countDocuments(filter);
    const totalPages   = Math.ceil(totalProducts/limit);

    const products = await Products.find(filter)
      .skip(skip).limit(limit)
      .populate('author','username email')
      .sort({ createdAt: -1 });

    res.json({ products, totalProducts, totalPages, currentPage: +page });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET single product + its reviews
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  try {
    const product = await Products.findById(id)
      .populate('author','username email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const reviews = await Reviews.find({ productId: id })
      .populate('userId','username email');

    res.json({ product, reviews });
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ message: 'Failed to fetch the product' });
  }
});

// POST create product
router.post('/create-product', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const newProduct   = new Products({ ...req.body });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// PATCH update product
router.patch('/update-product/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  try {
    const updated = await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// DELETE product + its reviews
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  try {
    const deleted = await Products.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    await Reviews.deleteMany({ productId: id });
    res.json({ message: 'Product and its reviews deleted' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
