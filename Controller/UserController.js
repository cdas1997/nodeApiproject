
const ProductModel=require('../Model/Product')

exports.getProductDisplay=(req,res)=>{
    ProductModel.find().then(allproducts=>{
        res.render('User/viewProduct',{title_page: "DATA", data: allproducts,path:'/viewProduct'});
    })
    .catch(err=>{
        console.log("error to fetch data",err);
    })
  
    };

    exports.getProductDisplayWithPname=(req,res)=>{
        ProductModel.find({},{"P_img":1,"P_name":1,"P_price":1,"P_des":1}).sort({"P_name":1}).then(allproducts=>{
            res.render('User/viewProduct',{title_page: "DATA", data: allproducts,path:'/viewProduct/Pname'});
        })
        .catch(err=>{
            console.log("error to fetch data",err);
        })
      
        };

            exports.getProductDisplayWithPprice=(req,res)=>{
        ProductModel.find({},{"P_img":1,"P_price":1,"P_name":1,"P_des":1}).sort({"P_price":1}).then(allproducts=>{
            res.render('User/viewProduct',{title_page: "DATA", data: allproducts,path:'/viewProduct/Pprice'});
        })
        .catch(err=>{
            console.log("error to fetch data",err);
        })
    };

    
    exports.getProductDisplayWithPpriceHL=(req,res)=>{
        ProductModel.find({},{"P_img":1,"P_price":1,"P_name":1,"P_des":1}).sort({"P_price":-1}).then(allproducts=>{
            res.render('User/viewProduct',{title_page: "DATA", data: allproducts,path:'/viewProduct/PpriceHL'});
        })
        .catch(err=>{
            console.log("error to fetch data",err);
        })
    };


    exports.getProductDisplayWithPdes=(req,res)=>{
        ProductModel.find({},{"P_img":1,"P_des":1,"P_price":1,"P_name":1}).sort({"P_des":1}).then(allproducts=>{
            res.render('User/viewProduct',{title_page: "DATA", data: allproducts,path:'/viewProduct/Pdes'});
        })
        .catch(err=>{
            console.log("error to fetch data",err);
        })
    };

  exports.getSingleProduct=(req,res)=>{
      const product_id=req.params.prodid;
      console.log("collected product_id",product_id);
      ProductModel.findById(product_id).then(Product=>{
          console.log("Produt found by ID",Product);
          res.render('User/ProductDetails',{title_page: "PRODUCT DETAILS",data: Product,path:'/ProductDetails/:prodid'});
      })
      .catch(err=>{
          console.log("Product not found",err);
      })
  }  


  exports.postSearchProduct=(req,res)=>{
                    
    const search=req.body.search;

    console.log("collected searched word",search);
    ProductModel.find({P_name:search}).then(result=>{
        console.log("data for search word",result);
        // res.redirect('/viewproduct');
        res.render('User/viewProduct',{title_page:"Search Data",data:result,path:'/searchProduct'})
    })
    .catch(err=>{
        console.log("error in searching",err);
    })
    
    }  



