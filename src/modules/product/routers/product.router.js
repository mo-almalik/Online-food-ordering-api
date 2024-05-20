import { Router } from "express";
import { upload } from "../../../middleware/upload.middleware.js";
import { validate } from "../../../middleware/validation.middleware.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { AddProductSchema, UpdateProductSchema, paramsId } from "../validations/validation.product.js";
import { AddProduct, DeleteProduct, GetAllProducts, GetSingleProduct, UpdateProduct } from "../controller/product.controller.js";



const router = Router()

router.route('/')
.get(GetAllProducts)
.post(authenticate,authorize('admin'),upload.single('image'),validate(AddProductSchema),AddProduct)



router.route('/:id')
.get(GetSingleProduct)
.delete(authenticate,authorize('admin'),validate(paramsId),DeleteProduct)
.patch(authenticate,authorize('admin'),upload.single('image'),validate(UpdateProductSchema),UpdateProduct)
export default router