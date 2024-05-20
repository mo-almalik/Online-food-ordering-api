import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    image: {
      name:String,
      path: String,
      public_id:String
    },
  },{timestamps: true });
  
const Category = mongoose.model('Category', CategorySchema);

export default Category