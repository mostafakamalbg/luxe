const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const app = express();
const cors = require('cors');

const port = 5000;
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb+srv://mostafakamalbg:Mostafa12@cluster0.qlqt4kr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Example schema
const Product = mongoose.model('Products', { name: String });

let products = [
  { id: 1, name: "Apple", price: 120 },
  { id: 2, name: "Banana", price: 60 }
];

// ✅ GET: সব প্রোডাক্ট দেখাবে
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ POST: নতুন প্রোডাক্ট অ্যাড করবে
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required." });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };
  products.push(newProduct);

  res.status(201).json(newProduct);
});


// Routes
app.use(productRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
