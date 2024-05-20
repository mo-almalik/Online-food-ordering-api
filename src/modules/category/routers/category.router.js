
import { Router } from "express";
import { AddCategory, DeleteCategory, GetAllCategories, GetSingleCategory, UpdateCategory } from "../controller/category.controller.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { validate } from "../../../middleware/validation.middleware.js";
import { upload } from "../../../middleware/upload.middleware.js";
import { AddCategorySchema, UpdateCategorySchema, paramsId } from "../validations/validation.category.js";


const router = Router()


  router.route('/')
  .get(GetAllCategories)
  .post(authenticate,authorize('admin'),upload.single('image'),validate(AddCategorySchema),AddCategory)
  
  
  
  router.route('/:id')
  .get(GetSingleCategory)
  .delete(authenticate,authorize('admin'),validate(paramsId),DeleteCategory)
  .patch(authenticate,authorize('admin'),upload.single('image'),validate(UpdateCategorySchema),UpdateCategory)


export default router