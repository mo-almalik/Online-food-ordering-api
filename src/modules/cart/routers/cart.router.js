
import { Router } from "express";
import  {updateCartQuantity, AddToCart, GetLoggedUserCart, ClareCart, RemoveItems } from "../controller/cart.controller.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { IdCartSchema, productId, updateQuantitySchema } from "../validations/validation.cart.js";
import { validate } from "../../../middleware/validation.middleware.js";


const router = Router()

router.route('/')
.post(authenticate,authorize('admin', 'user'),validate(IdCartSchema),AddToCart)
.get(authenticate,authorize('admin', 'user'),GetLoggedUserCart)
.delete(authenticate,authorize('admin','user'),ClareCart)

router.post("/update-quantity",
    authenticate, 
    authorize('admin', 'user'),
    validate(updateQuantitySchema),
    updateCartQuantity 
  );


router.route('/:productId')
.post(authenticate,authorize('admin', 'user'),validate(productId),RemoveItems)
export default router