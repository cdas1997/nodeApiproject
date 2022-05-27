const express=require('express');
const home_router=express.Router();
const homeController=require('../Controller/HomeController');


home_router.get('/',homeController.getHome);




module.exports=home_router;