const CartModel=require('../Model/Cart')
const path=require('path');


   exports.postCartValue=(req,res)=>{
    console.log("collected cart value",req.body.title);
    const Pname=req.body.title;
    const Pprice=req.body.price;
    const Pdes=req.body.des;

      const Pimage_url=req.body.productimg;
    // const ProdImage=req.file;
    // const Pimage_url=ProdImage.path;



  
  
   
let CartData=new CartModel({ Pr_name:Pname,Pr_price:Pprice,Pr_des:Pdes,Pr_img:Pimage_url});
CartData.save().then(res=>{
console.log("data added successfully",res)
}).catch(err=>{
console.log("error in adding data",err)
}); //to save data in file product_data.json

    res.redirect('/cart');
    
    };


    exports.getCartDisplay=(req,res)=>{
        CartModel.find().then(allproducts=>{
            res.render('User/Cart',{title_page: "CART", cartdata: allproducts,path:'/Cart'});
        })
        .catch(err=>{
            console.log("error to fetch cart data",err);
        })
      
        };


        exports.postDeleteCartProduct=(req,res)=>{
                    
            const product_id=req.body.product_id;

            console.log("collected product_id",product_id);
            CartModel.deleteOne({_id:product_id}).then(result=>{
                console.log("cart product has been deleted",result);
                res.redirect('/cart');
            })
            .catch(err=>{
                console.log("Product has not been deleted",err);
            })
            
            }  