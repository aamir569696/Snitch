import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct,getSellerProduct } from "../controllers/product.controller.js";
import {createProductValidator} from "../validator/product.validate.js"
import multer from "multer"

const router = Router();

const upload= multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5* 1024*1024//5 mb
    }
})


router.post("/",
 authenticateSeller,upload.array('images',7),createProductValidator, createProduct);


router.get("/seller", authenticateSeller,getSellerProduct)


export default router;