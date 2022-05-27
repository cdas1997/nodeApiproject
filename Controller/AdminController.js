
const ProductModel=require('../Model/Product')
    // const dataArray=[];
    const path=require('path');

exports.getProduct=(req,res)=>{
    res.render('Admin/Addproduct',{title_page: "PRODUCT PAGE",path:'/addproduct'});
    };
    
    exports.postProductValue=(req,res)=>{
        console.log("collected value",req.body);
        const Pname=req.body.title;
        const Pprice=req.body.price;
        const Pdes=req.body.des;

          const Pimage_url=req.file.path;
        // const ProdImage=req.file;
        // const Pimage_url=ProdImage.path;

      
      
       
let ProductData=new ProductModel({ P_name:Pname,P_price:Pprice,P_des:Pdes,P_img:Pimage_url});
ProductData.save().then(res=>{
    console.log("data added successfully",res)
}).catch(err=>{
    console.log("error in adding data",err)
}); //to save data in file product_data.json

        res.redirect('/Product');
        
        };
    
    
        // exports.getProductDisplay=(req,res)=>{
        //     res.render('Admin/Product',{title_page: "DATA", data: dataArray});
        //     };

        
        exports.getProductDisplay=(req,res)=>{
            ProductModel.find().then(allproducts=>{
                
                return res.status(201).json({
                    success:true,
                    message:"Product Fetched Successfully",
                    result:allproducts
            
                })
            })
            .catch(err=>{
                console.log("error to fetch data",err);
            })
          
            };

             
        exports.getProductDisplayWithPname=(req,res)=>{
            ProductModel.find({},{"P_img":1,"P_name":1,"P_price":1,"P_des":1}).sort({"P_name":1}).then(allproducts=>{
                res.render('Admin/Product',{title_page: "DATA", data: allproducts,path:'/Product/Pname'});
            })
            .catch(err=>{
                console.log("error to fetch data",err);
            })
          
            };

            exports.getProductDisplayWithPprice=(req,res)=>{
                ProductModel.find({},{"P_img":1,"P_price":1,"P_name":1,"P_des":1}).sort({"P_price":1}).then(allproducts=>{
                    res.render('Admin/Product',{title_page: "DATA", data: allproducts,path:'/Product/Pprice'});
                })
                .catch(err=>{
                    console.log("error to fetch data",err);
                })
              
                };

                exports.getProductDisplayWithPpriceHL=(req,res)=>{
                    ProductModel.find({},{"P_img":1,"P_price":1,"P_name":1,"P_des":1}).sort({"P_price":-1}).then(allproducts=>{
                        res.render('Admin/Product',{title_page: "DATA", data: allproducts,path:'/Product/PpriceHL'});
                    })
                    .catch(err=>{
                        console.log("error to fetch data",err);
                    })
                  
                    };


                exports.getProductDisplayWithPdes=(req,res)=>{
                    ProductModel.find({},{"P_img":1,"P_des":1,"P_price":1,"P_name":1}).sort({"P_des":1}).then(allproducts=>{
                        res.render('Admin/Product',{title_page: "DATA", data: allproducts,path:'/Product/Pdes'});
                    })
                    .catch(err=>{
                        console.log("error to fetch data",err);
                    })
                  
                    };



            

      

            exports.getProductEditDisplay=(req,res)=>{
                const product_id=req.params.prodid;
                console.log("collected product_id",product_id);
                ProductModel.findById(product_id).then(Product=>{
                    console.log("Produt found by ID",Product);
                    res.render('Admin/ProductEdit',{title_page: "PRODUCT EDIT",data: Product,path:'/ProductEdit/:prodid'});
                })
                .catch(err=>{
                    console.log("Product not found",err);
                })
            }  
          

           exports.postProductEditedValue=(req,res)=>{
                console.log("collected value from product edit form",req.body);
                const editedPname=req.body.title;
                const editedPprice=req.body.price;
                const editedPdes=req.body.des;
                const editedPid=req.body.product_id;
                let editedPimage=" ";
                const oldurl=req.body.oldurl;
                console.log(editedPimage,oldurl);
if(req.file===undefined)
{
    editedPimage=oldurl;
}
else{
    editedPimage=req.file.path;
}

                ProductModel.findById(editedPid).then(updateData=>{
                    updateData.P_name=editedPname;
                    updateData.P_price=editedPprice;
                    updateData.P_des=editedPdes;
                    updateData.P_img=editedPimage;

                    return updateData.save()
                    .then(result=>{
                        console.log("data added successfully",result);
                        res.redirect('/Product');
                    }).catch(err=>{
                        console.log("error in adding data",err);
                    });
                })
      
     
                
                }

         
                
                exports.getProductDeleteDisplay=(req,res)=>{
                    const product_id=req.params.prodid;
                    console.log("collected product_id",product_id);
                    ProductModel.deleteOne({_id:product_id}).then(result=>{
                        console.log("data has been deleted",result);
                        res.redirect('/Product');
                    })
                    .catch(err=>{
                        console.log("Product has not been deleted",err);
                    })
                }


          
                exports.postDeleteProduct=(req,res)=>{
                    
                    const product_id=req.body.product_id;
    
                    console.log("collected product_id",product_id);
                    ProductModel.deleteOne({_id:product_id}).then(result=>{
                        console.log("data has been deleted",result);
                        res.redirect('/Product');
                    })
                    .catch(err=>{
                        console.log("Product has not been deleted",err);
                    })
                    
                    }      

