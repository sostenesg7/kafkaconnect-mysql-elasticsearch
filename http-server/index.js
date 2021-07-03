const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const { MONGO_URI, MONGO_USER, MONGO_PASS } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    user: MONGO_USER,
    pass: MONGO_PASS,
  })
  .then(() => {
    console.log('MONGODB CONNECTED');
  });

const ProductSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
  },
  { safe: false }
);

const Product = mongoose.model('product_http', ProductSchema);

app.get('/api/product', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/api/product/{id}', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.post('/api/product', async (req, res) => {
  console.log(req.headers, req.body, req.params, req._read(100));
  const product = await Product.create(req.body);
  console.log('NEW PRODUCT CREATED', product);
  res.json(product);
});

app.listen(3000, () => {
  console.log('SERVER STARTED AT PORT 3000');
});
