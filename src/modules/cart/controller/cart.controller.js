import { catchError } from "../../../../utils/error.handler.js";
import Cart from "../../../models/Cart.js";
import Product from '../../../models/Product.js'

const AddToCart = catchError(async (req, res) => {
  const { product: productId } = req.body;
  const userId = req.user.id;

  // العثور على عربة التسوق الحالية أو إنشاء واحدة جديدة
  let cart = await Cart.findOne({ user: userId });
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const price = product.price;

  if (!cart) {
    cart = new Cart({
      user: userId,
      cartItems: [{ product: productId, price,  total: price }],
    });
  } else {
    let item = cart.cartItems.find((item) => item.product.toString() === productId);

    if (item) {
      item.quantity += 1;
      item.total = item.quantity * item.price;
    } else {
      cart.cartItems.push({ product: productId, price, quantity: 1, total: price });
    }
  }

  await cart.save();
  res.status(201).json(cart);
});




export { 
    AddToCart
}