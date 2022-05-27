const mongoose=require('mongoose');
const SchemaVariable=mongoose.Schema;

const ProductSchema=new SchemaVariable({
    P_name:{
   type:String,
   required:true
    },
    P_price:{
        type:Number,
        required:true
    },
    P_des:{
        type:String,
        required:true
    },
    P_img:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Products',ProductSchema);

// mongoose.model('collection name',schema variavle name);