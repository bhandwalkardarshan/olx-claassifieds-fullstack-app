const express = require('express');
const cors = require('cors');
const db = require('./config/db');
// Define routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(express.json()); 
app.use(cors());

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
