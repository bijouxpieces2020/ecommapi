const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema(
    {
        userID:{ type: String, required: true},
        products:[{
            productid: {
                type: String,
                },
            quantity:{
                type:Number,
                default:1,
            }
            },
        ],

    },
    {timestamps:true}
);
module.exports = mongoose.model("Cart, cartSchema");