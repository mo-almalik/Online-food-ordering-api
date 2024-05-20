import { Router } from "express";
import authRouter from '../modules/auth/auth.router.js'
import  userRouter from '../modules/user/routers/user.router.js'
import  cartsRouter from '../modules/cart/routers/cart.router.js'
import  ordersRouter from '../modules/order/routers/order.router.js'
import  reviewsRouter from '../modules/review/routers/review.router.js'
import  productsRouter from '../modules/product/routers/product.router.js'
import  categoryRouter from '../modules/category/routers/category.router.js'

const router = Router();

router.use('/auth',     authRouter);
router.use('/user',     userRouter);
router.use('/carts',    cartsRouter);
router.use('/orders',   ordersRouter);
router.use('/reviews',  reviewsRouter);
router.use('/products', productsRouter);
router.use('/categories', categoryRouter);

export default router;