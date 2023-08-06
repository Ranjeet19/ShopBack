const Product = require('../model/Product');
const fs = require('fs');
const mongoose = require('mongoose');


module.exports.getAllProducts = async (req, res) => {
  // console.log(req.params);
  //console.log(req.query);
  try {
    const response = await Product.find();
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid id'
      });
    } else {
      const response = await Product.findById(id);
      return res.status(200).json(response)
    }


  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}


module.exports.addProduct = async (req, res) => {
  const imagePath = req.imagePath
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;
  try {


    await Product.create({
      product_name,
      product_detail,
      product_price,
      product_image: imagePath,
      brand,
      category,
      countInStock
    });

    return res.status(201).json({
      status: 'success',
      message: "product added succesfully"
    });


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}




module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;
  try {

    if (req.newImagePath) {

      await Product.findByIdAndUpdate({ _id: id }, {
        product_name,
        product_detail,
        product_price,
        brand,
        product_image: req.newImagePath,
        category,
        countInStock
      });


    } else {
      await Product.findByIdAndUpdate({ _id: id }, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock
      });
    }

    return res.status(201).json({
      status: 'success',
      message: "product updated succesfully"
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}




module.exports.removeProduct = async (req, res) => {
  const { imagePath } = req.query;
  const { id } = req.params;

  try {



    await Product.findByIdAndDelete({ _id: id });
    fs.unlink(`.${imagePath}`, (err) => {
    })
    return res.status(201).json({
      status: 'success',
      message: "product removed succesfully"
    });




  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}





