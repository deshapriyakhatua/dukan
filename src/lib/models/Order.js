const { default: mongoose } = require("mongoose");

// Sub-order schema for individual products
const subOrderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Specific price for this product
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Track the seller
});

// Main order schema for grouping sub-orders
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subOrders: [subOrderSchema], // Embed sub-orders
  totalPrice: { type: Number, required: true }, // Sum of sub-orders
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  paymentMethod: {
    type: String,
    enum: ['online', 'cash_on_delivery'],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
