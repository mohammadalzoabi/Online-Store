const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();




router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);



router.post('/login',
                check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
                //check('password').isLength({min: 6}).withMessage('The password must be at least 6 characters long').isAlphanumeric().withMessage('The password must only contain letters and numbers').trim(),
            authController.postLogin);

router.post('/signup',
                    check('email').isEmail().withMessage('Invalid Email').custom((value, {req}) => {
                        return User.findOne({email:value})
                            .then(userDoc => {
                                if(userDoc) {
                                    return Promise.reject('An account with that email already exists.');
                                }
                            });
                        }).normalizeEmail(),
                    check('password').isLength({min: 6}).withMessage('The password must be at least 6 characters long').isAlphanumeric().withMessage('The password must only contain letters and numbers').trim(),
                    check('confirmPassword').custom((value, {req}) => {
                        if(value !== req.body.password) {
                            throw new Error('Passwords must match')
                        }
                        return true;
                    }).trim(),
            authController.postSignup);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);



module.exports = router;