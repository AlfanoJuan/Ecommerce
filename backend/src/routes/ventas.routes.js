import { Router } from 'express';
import { postVenta, getAllVentas, getVentaD, getVentaId, deleteVenta } from '../controllers/ventas.controller.js';

const router = Router();

router.post("/postVenta", postVenta);

router.get("/getAllVentas", getAllVentas)
router.get("/getVentaD/:id", getVentaD)
router.get("/getVentaId/:id", getVentaId)

router.delete("/deleteVenta/:id", deleteVenta)

export default router;