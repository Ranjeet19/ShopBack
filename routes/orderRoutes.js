const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checks = require('../milddleware/checkUsers');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const orderSchema = Joi.object({
  totalPrice: Joi.number().required(),
  orderItems: Joi.array().min(1).required()
})




router.post('/api/orderAdd', checks.checkUser, validator.body(orderSchema), orderController.addOrder);

router.get('/api/getUserOrder', checks.checkUser, orderController.getOrderByUser);

router.get('/api/getOrder/:id', checks.checkUser, orderController.getOrderById);



router.get('/api/getAllOrders', checks.checkAdmin, orderController.getAllOrders);


module.exports = router;