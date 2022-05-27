const mongoose=require('mongoose');
const SchemaVariable=mongoose.Schema;

const CartSchema=new SchemaVariable({
    Pr_name:{
   type:String,
   required:true
    },
    Pr_price:{
        type:Number,
        required:true
    },
    Pr_des:{
        type:String,
        required:true
    },
    Pr_img:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Cart',CartSchema);