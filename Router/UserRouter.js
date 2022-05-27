const express=require('express');
const user_router=express.Router();
const userController=require('../Controller/UserController');
const Auth_check=require('../Middle_ware/isAuth');


user_router.get('/viewProduct',userController.getProductDisplay);

user_router.get('/ProductDetails/:prodid',Auth_check,userController.getSingleProduct);
user_router.post('/searchProduct',userController.postSearchProduct);
user_router.get('/viewProduct/Pname',userController.getProductDisplayWithPname);
user_router.get('/viewProduct/Pprice',userController.getProductDisplayWithPprice);
user_router.get('/viewProduct/PpriceHL',userController.getProductDisplayWithPpriceHL);
user_router.get('/viewProduct/Pdes',userController.getProductDisplayWithPdes);




module.exports=user_router;