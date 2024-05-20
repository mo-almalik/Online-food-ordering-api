import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new  Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        price: Number,
        quantity: {
            type:Number,
            default:1
        },
        total: {
          type: Number,
          required: true,
        },

      },
    ],

    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

cartSchema.pre('save', function (next) {
  this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.total, 0);
  next();
});
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
