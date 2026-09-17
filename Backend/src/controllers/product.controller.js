import ProductModel from "../models/product.model.js";

export async function createProduct(req, res){

    const {title,description,priceamount,pricecurency}=req.body;

    const seller=req.user;


    const images=await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname
        })
    }))

    const newProduct=await ProductModel.create({
        title,
        description,
        price:{
            amount:priceamount,
            currency:pricecurency ||"USD"
        },

        images,
        seller:seller._id
    })

    res.status(200).json({
        message:"product created successfully",
        success:true,
        newProduct
    })

}
export async function getSellerProduct(req,res) {
    const seller=req.user

    const product=await ProductModel.find({seller:seller._id})

    res.status(200).json({
        message:"product get succesfully",
        success:true,
        product
    })

}


