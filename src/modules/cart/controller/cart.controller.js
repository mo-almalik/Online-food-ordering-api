import { AppError, catchError } from "../../../../utils/error.handler.js";
import Cart from "../../../models/Cart.js";
import Product from '../../../models/Product.js'

const AddToCart = catchError(async (req, res) => {
  const { product: productId ,quantity} = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId });
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const price = product.price;

  if (!cart) {
    cart = new Cart({
      user: userId,
      cartItems: [{ product: productId, price,  total: price ,quantity }],
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


//get user login cart

const GetLoggedUserCart = catchError(async(req,res)=>{
  const cart = await Cart.findOne({user:req.user.id}).populate('cartItems.product')
  if(!cart) res.status(404).json({message:'cart not found !'})
    res.json({cart})
})

// update

const updateCartQuantity = catchError(async (req, res) => {
  const { product: productId, quantity } = req.body;
  const userId = req.user.id;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than zero' });
  }

  let cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  let item = cart.cartItems.find(item => item.product._id.toString() === productId);

  if (!item) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  item.quantity += quantity;
  item.total += item.price * quantity;

  // Recalculate totalPrice of the cart
  cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.total, 0);

  await cart.save();
  res.status(200).json(cart);
});

 

// clare cart

const ClareCart = catchError(async (req, res) => {


  const cart = await Cart.findOneAndDelete({user:req.user.id})

  if(!cart)  throw new AppError('cart not found !',404)

   res.json({message:'cart deleted success'})

})
 
const RemoveItems  = catchError(async (req, res) => {
  const {productId } = req.params;
  const userId = req.user.id;


  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }


  let itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Product not found in cart' });
  }

  cart.cartItems.splice(itemIndex, 1);


  cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.total, 0);

  await cart.save();
  res.status(200).json({ message: 'Item removed successfully', cart });
});
export { 
    AddToCart,
    GetLoggedUserCart,
    updateCartQuantity,
    ClareCart,
    RemoveItems
}