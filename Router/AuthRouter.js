const express=require('express');
const auth_router=express.Router();
const authController=require('../Controller/AuthController');
const {check,body}=require('express-validator');


auth_router.post('/postRegValue',
[
    body('firstname','valid firstname here').isLength({min:3,max:12}),
    body('lastname','valid lastname here').isLength({min:3,max:12}),
    check('email').isEmail().withMessage('input Valid email here'),
    body('password','input valid password here').matches('^(?=.*[A-Za-z0-9])(?=.*[!@#&*]).{4,12}$')
],
authController.postUserValueRegistration);

auth_router.post('/postLogValue',
[
    check('email').isEmail().withMessage('input Valid email here'),
    body('password','input valid password here').matches('^(?=.*[A-Za-z0-9])(?=.*[!@#&*]).{4,12}$')
],authController.postUserValueLogin);

// auth_router.get('/Logout',authController.getLogout);





module.exports=auth_router;