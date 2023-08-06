const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const fileUpload = require('express-fileupload');

// mongoose.set('strictQuery', false);

// let d = {
//   title: 'hello'
// };

// const data = {

// };

// d.title = data.title || d.title;
// console.log(d);

mongoose.connect('mongodb+srv://rnzt1999:moles900@cluster0.0im6jab.mongodb.net/Shopy').then((result) => {
  app.listen(5000);
}).catch((err) => {
  console.log(err);
})

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}));

app.use('/uploads', express.static('uploads'))

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use((req, res) => {
  return res.status(404).json({
    message: 'not found'
  });
});