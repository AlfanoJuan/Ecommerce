import { Router } from 'express';
import { deleteCarrito, getCarritoTotal, getCarritoId, getCarritoA, getCarritoD, postCarrito } from '../controllers/carrito.controller.js';

const router = Router();

router.post('/postCarrito', postCarrito);

router.get("/getCarritoId/:id", getCarritoId);
router.get("/getCarritoA/:id", getCarritoA);
router.get("/getCarritoD/:id", getCarritoD);
router.get("/getCarritoTotal/:id", getCarritoTotal);

router.delete("/deleteCarrito/:id", deleteCarrito)

export default router;