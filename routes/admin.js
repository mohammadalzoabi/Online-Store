const path = require('path');

const express = require('express');
const { check, body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();



router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', 
                           check('title').isLength({min:1}).withMessage('The title cannot be empty').trim(),
                           //check('imageUrl').isURL().withMessage('Invalid URL').trim(),
                           check('price').isLength({min:1}).withMessage('Please enter a valid price'),
                           check('description').isLength({min:1,max:240}).withMessage('The description cannot be empty and must have more than 240 characters').trim(),
            isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
                            check('title').isLength({min:1}).withMessage('The title cannot be empty').trim(),
                            //check('imageUrl').isURL().withMessage('Invalid URL').trim(),
                            check('price').isLength({min:1}).withMessage('Please enter a valid price'),
                            check('description').isLength({min:1,max:240}).withMessage('The discription cant have more than 240 characters').trim(),
            isAuth, adminController.postEditProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);



module.exports = router;