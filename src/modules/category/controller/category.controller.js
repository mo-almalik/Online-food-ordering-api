import { v2 as cloudinary } from "cloudinary";
import { AppError, catchError } from "../../../../utils/error.handler.js";
import Category from "../../../models/Category.js";



// add Category => only Admin
const AddCategory = catchError(async (req, res) => {

  if (!req.file) {
    
    return res.status(400).json({ message: "Upload Category image" });
  }

  const { name } = req.body;

  try {
    // Upload the image to Cloudinary
    const { path } = req.file;
    const Image = await cloudinary.uploader.upload(path, {
      folder: "Foods/categories",
    });

    try {
     
      const data = await Category.create({
        name,
        image: {
          name: Image.asset_id,
          path: Image.secure_url,
          public_id: Image.public_id,
        },
        createdBy: req.user.id,
      });

    
      res.status(201).json({ message: "Add success", data });
    } catch (error) {
  
      await cloudinary.uploader.destroy(Image.public_id);

      res.status(500).json( error.message );
    }
  } catch (uploadError) {
    // Handle errors that occur during the image upload
    res.status(500).json({ message: "An error occurred during image upload", error: uploadError.message });
  }
});


// delete category

const DeleteCategory =catchError(async(req,res)=>{
  const {id} = req.params
  const category = await  Category.findByIdAndDelete(id)
  if(!category) throw new AppError('category not found !' , 404)
    await cloudinary.uploader.destroy(category.image.public_id);
    
   res.json({ message: 'category deleted successfully' });
})


// Get all category
const GetAllCategories = catchError(async(req,res)=>{
  const categories = await  Category.find().select(' -createdBy  -image.public_id')
   res.json({data:categories });
})

// get single category

const GetSingleCategory =catchError(async(req,res)=>{
  const {id} = req.params
  const category = await  Category.findById(id).select(' -createdBy  -image.public_id')
  if(!category) throw new AppError('category not found !' , 404)
    res.json({data:category });
})

// update category

const UpdateCategory = catchError(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findById(id);
  if (!category) throw new AppError('category not found!', 404);


  if (req.file) {
    const { path } = req.file;
    const Image = await cloudinary.uploader.upload(path, {
      folder: "Foods/categories",
    });

    if (category.image.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }
    category.image = {
      name: req.file.originalname,
      path: Image.secure_url,
      public_id: Image.public_id
    };
  }

  category.name = name || category.name;
  category.createdBy = req.user.id || category.createdBy;


  const updatedCategory = await category.save();

  res.status(200).json({ message: "Updated successfully", data: updatedCategory });

});
export { 
  AddCategory,
  DeleteCategory,
  GetAllCategories,
  GetSingleCategory,
  UpdateCategory
};
