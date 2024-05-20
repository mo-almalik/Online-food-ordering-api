import { v2 as cloudinary } from "cloudinary";
import Product from "../../../models/Product.js";
import { AppError, catchError } from "../../../../utils/error.handler.js";



// add Product => only Admin
const AddProduct = catchError(async (req, res) => {
  if (!req.file) return res.status(400).json("upload product image ");
  const { path } = req.file;
  const { name, description, price ,createdBy} = req.body;
  
  const Image = await cloudinary.uploader.upload(path, {
    folder: "Foods",
  });

  const data = await Product.create({
    name,
    description,
    price,
    image: {
      name: Image.asset_id,
      path: Image.secure_url,
      public_id:Image.public_id
    },
    createdBy:req.user.id
  });

  res.status(201).json({ massage: "add success", data });
});


// delete product

const DeleteProduct =catchError(async(req,res)=>{
  const {id} = req.params
  const product = await  Product.findByIdAndDelete(id)
  if(!product) throw new AppError('product not found !' , 404)
    await cloudinary.uploader.destroy(product.image.public_id);
    
   res.json({ message: 'Product deleted successfully' });
})


// Get all products
const GetAllProducts = catchError(async(req,res)=>{
  const product = await  Product.find().select(' -createdBy  -image.public_id')
   res.json({data:product });
})

// get single product

const GetSingleProduct =catchError(async(req,res)=>{
  const {id} = req.params
  const product = await  Product.findById(id).select(' -createdBy  -image.public_id')
  if(!product) throw new AppError('product not found !' , 404)
    res.json({data:product });
})

// update product

const UpdateProduct = catchError(async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  const product = await Product.findById(id);
  if (!product) throw new AppError('Product not found!', 404);


  if (req.file) {
    const { path } = req.file;
    const Image = await cloudinary.uploader.upload(path, {
      folder: "Foods",
    });

    if (product.image.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }
    product.image = {
      name: req.file.originalname,
      path: Image.secure_url,
      public_id: Image.public_id
    };
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.createdBy = req.user.id || product.createdBy;


  const updatedProduct = await product.save();

  res.status(200).json({ message: "Updated successfully", data: updatedProduct });
});
export { AddProduct ,DeleteProduct,GetAllProducts,GetSingleProduct ,UpdateProduct };
