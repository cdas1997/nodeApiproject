const express=require('express');
const admin_router=express.Router();
const adminController=require('../Controller/AdminController');
const Auth_check=require('../Middle_ware/isAuth');


admin_router.get('/addproduct',adminController.getProduct);
admin_router.post('/postValue',adminController.postProductValue);
admin_router.get('/Product',adminController.getProductDisplay);
admin_router.get('/ProductEdit/:prodid',Auth_check,adminController.getProductEditDisplay);
admin_router.post('/postEditedValue',adminController.postProductEditedValue);
admin_router.get('/ProductDelete/:prodid',adminController.getProductDeleteDisplay);
admin_router.post('/DeleteProduct',adminController.postDeleteProduct);
admin_router.get('/Product/Pname',adminController.getProductDisplayWithPname);
admin_router.get('/Product/Pprice',adminController.getProductDisplayWithPprice);
admin_router.get('/Product/PpriceHL',adminController.getProductDisplayWithPpriceHL);
admin_router.get('/Product/Pdes',adminController.getProductDisplayWithPdes);



module.exports=admin_router;