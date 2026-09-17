import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProduct } from "../controllers/product.controller.js";
import {createProductValidator} from "../validator/product.validate.js"
import multer from "multer"

const router = Router();

const upload= multer({
    Storage:multer.memoryStorage(),
    limit:{
        filesize:5* 1024*1024//5 mb
    }
})


router.post("/product", authenticateSeller,createProductValidator,upload.array('images',7), createProduct);

export default router;