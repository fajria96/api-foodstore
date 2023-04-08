const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    minlength: [5, "Panjang nama makanan minimal 5 karakter"],
    required: [true, "Nama tidak boleh kosong"],
  },
  qty: {
    type: Number,
    required: [true, "Quantity tidak boleh kosong"],
    min: [1, "Minimal quantity adalah 1"],
  },
  price: {
    type: Number,
    default: 0,
  },

  img_url: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("CartItem", cartItemSchema);
