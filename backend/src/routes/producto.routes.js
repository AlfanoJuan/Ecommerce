import { Router } from 'express';
import { deleteProducto, getProducto, geteditProducto, postProducto, putProducto } from '../controllers/producto.controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() +  '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskStorage
}).single('img_prod')

router.post("/postProducto", fileUpload, postProducto);

router.get("/getProducto", getProducto)
router.get("/geteditProducto/:id", geteditProducto)

router.put("/editProducto/:id", fileUpload, putProducto);

router.delete("/deleteProduto/:id", deleteProducto)

export default router;