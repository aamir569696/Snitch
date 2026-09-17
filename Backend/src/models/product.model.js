import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "snitch_users",
    required: true,
  },
  price: {
    amount: {
         type: Number,
          required: true
         },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"],
      default: "USD",
    },
  },

  image:{
    url: { type: String, required: true },
  }


}, { timestamps: true });


const ProductModel = mongoose.model("snitch_products", productSchema);

export default ProductModel;