import { Router } from 'express';
import { postCategoria, getAllCategorias, getCategoriaId, deleteCategoria, getCategoriaNombre, EditCategoria } from '../controllers/categorias.controller.js';

const router = Router();

router.post("/postCategoria", postCategoria);

router.get("/getAllCategorias", getAllCategorias)
router.get("/getCategoriaId/:id", getCategoriaId)
router.get("/getCategoriaNombre/:nombre", getCategoriaNombre)

router.put("/deleteCategoria", deleteCategoria)
router.put("/EditCategoria", EditCategoria)

export default router;