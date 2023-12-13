const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    image:String,
    type:{
        type:String,
        default:'food'
    },
    time:{
        type:Number,
        default:0
    },
    diet:{
        type:String,
        required:true
    },
    steps:String,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Dish = mongoose.model('Dish',dishSchema);
module.exports=Dish;