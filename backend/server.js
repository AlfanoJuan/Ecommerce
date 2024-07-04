import express from 'express';
import cors from 'cors';
import indexRoutes from './src/routes/index.routes.js';
import productoRoutes from './src/routes/producto.routes.js';
import userRoutes from './src/routes/user.routes.js';
import carritoRoutes from './src/routes/carrito.routes.js';
import categoriasRoutes from './src/routes/categorias.routes.js';
import ventasRoutes from './src/routes/ventas.routes.js';

const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.use(indexRoutes);
app.use(productoRoutes);
app.use(userRoutes);
app.use(carritoRoutes);
app.use(categoriasRoutes);
app.use(ventasRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Host is running in port ${port}`);
});

export default app;