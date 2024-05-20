import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = new  Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    image: {
      name:String,
      path: String,
      public_id:String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  },{timestamps: true });
  
  const Product = mongoose.model('Product', ProductSchema);
  export default Product
  