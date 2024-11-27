const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
  });
  
  module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
  