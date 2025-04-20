// const express = require('express')
// const mongoose = require('mongoose');
// const cors = require('cors')
// const app = express()
// require('dotenv').config()
// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
// const port = process.env.PORT || 3030;

// // Middleware setup
// app.use(express.json({limit: '25mb'}));
// app.use((express.urlencoded({limit: '25mb'})))
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));


// // all routes
// const authRoutes = require('./src/users/user.route');
// const productRoutes = require('./src/products/products.route')
// const reviewRoutes = require('./src/reviews/reviews.router')


// app.use("/api/auth", authRoutes)
// app.use("/api/products", productRoutes)
// app.use("/api/reviews", reviewRoutes)



// main().then(() => console.log("mongodb is successfully connected."))
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.DB_URL); 

//   app.get('/', (req, res) => {
//     res.send('Basha E-commerce Server is running....!')
//   })
// }

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })






// const express = require('express')
// const mongoose = require('mongoose');
// const cors = require('cors')
// const app = express()
// require('dotenv').config()
// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
// const port = process.env.PORT || 3030;

// // Middleware setup
// app.use(express.json({limit: '25mb'}));
// app.use(express.urlencoded({limit: '25mb', extended: true})); // ✅ fixed: was wrapped wrong before
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

// // all routes
// const authRoutes = require('./src/users/user.route');
// const productRoutes = require('./src/products/products.route');
// const reviewRoutes = require('./src/reviews/reviews.router'); // ✅ Matches your real file


// app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/reviews", reviewRoutes);

// main().then(() => console.log("mongodb is successfully connected."))
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.DB_URL); 

//   app.get('/', (req, res) => {
//     res.send('Basha E-commerce Server is running....!')
//   });
// }

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });




// const express      = require('express');
// const mongoose     = require('mongoose');
// const cors         = require('cors');
// const cookieParser = require('cookie-parser');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3030;

// // Middleware
// app.use(express.json({ limit: '25mb' }));
// app.use(express.urlencoded({ limit: '25mb', extended: true }));
// app.use(cookieParser());
// app.use(cors({ 
//   origin: ["http://localhost:5173", "https://basha-ecommerces.vercel.app"],
//   credentials: true 
// }));

// // Mount routes
// app.use('/api/auth',    require('./src/users/user.route'));
// app.use('/api/products',require('./src/products/products.route'));
// app.use('/api/reviews', require('./src/reviews/reviews.router'));

// app.get('/', (req, res) => res.send('Server is running!'));

// // Connect & start
// mongoose.connect(process.env.DB_URL)
//   .then(() => {
//     console.log(' MongoDB connected');
//     app.listen(port, () => console.log(` Listening on port ${port}`));
//   })
//   .catch(err => console.error(' DB connection error:', err));





const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3030;

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://basha-ecommerces.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth',     require('./src/users/user.route'));
app.use('/api/products', require('./src/products/products.route'));
app.use('/api/reviews',  require('./src/reviews/reviews.router'));

app.get('/', (req, res) => res.send('Server is running!'));

// Connect to MongoDB and start the server
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(port, () => console.log(`🚀 Server listening on port ${port}`));
  })
  .catch(err => console.error('❌ DB connection error:', err));
