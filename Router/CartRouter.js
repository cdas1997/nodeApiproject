const express=require('express');
const cart_router=express.Router();
const cartController=require('../Controller/CartController');




cart_router.post('/postcartvalue',cartController.postCartValue);
cart_router.get('/cart',cartController.getCartDisplay);
cart_router.post('/DeleteCartProduct',cartController.postDeleteCartProduct);








module.exports=cart_router;