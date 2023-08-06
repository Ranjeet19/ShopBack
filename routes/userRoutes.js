const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const checks = require('../milddleware/checkUsers');


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required()
})



router.post('/api/userLogin', validator.body(loginSchema), userController.userLogin);
router.post('/api/userSignUp', userController.userRegister);
router.get('/api/getUserProfile', checks.checkUser, userController.userProfile);
router.patch('/api/userUpdate', checks.checkUser, userController.userUpdate);



module.exports = router;