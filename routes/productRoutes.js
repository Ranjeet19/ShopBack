const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkfile = require('../milddleware/filecheck')
const checks = require('../milddleware/checkUsers');

router.get('/', productController.getAllProducts);


router.get('/api/product/:id', productController.getProductById);



router.post('/api/add/product', checks.checkAdmin, checkfile.fileCheck, productController.addProduct);


router.patch('/api/update/product/:id', checks.checkAdmin, checkfile.updateFileCheck, productController.updateProduct);



router.delete('/api/remove/product/:id', checks.checkAdmin, productController.removeProduct);



module.exports = router;