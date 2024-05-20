
import { Router } from "express";
import { AddToCart } from "../controller/cart.controller.js";
import { authenticate, authorize } from "../../auth/auth.middleware.js";
import { IdCartSchema } from "../validations/validation.cart.js";
import { validate } from "../../../middleware/validation.middleware.js";


const router = Router()

router.route('/')
.post(authenticate,authorize('admin', 'user'),validate(IdCartSchema),AddToCart)


router.route('/:productId')

export default router