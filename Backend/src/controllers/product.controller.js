import ProductModel from "../models/product.model.js";
import uploadImage from "../services/storage.service.js";

export async function createProduct(req, res) {
  console.log("🔥 createProduct function called"); // ADD THIS LINE
  //    try{

  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadImage({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const newProduct = await ProductModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "USD",
    },
    images,
    seller: seller._id,
  });
  res.status(200).json({
    message: "product created successfully",
    success: true,
    newProduct,
  });

  //    }catch (error) {
  //         console.error("createProduct error:", error);
  //         res.status(500).json({ message: "Something went wrong", success: false });
  //     }
}

export async function getSellerProduct(req, res) {
  const seller = req.user;

  const products = await ProductModel.find({ seller: seller._id });

  res.status(200).json({
    message: "product get succesfully",
    success: true,
    products,
  });
}

export async function getAllProducts(req,res) {
  const products= await ProductModel.find()

  res.status(201).json({
    message:"All products get successfully",
    success:true,
    products,

  })
}
