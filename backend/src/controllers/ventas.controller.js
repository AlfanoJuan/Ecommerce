import { pool } from "../db.js";

export const postVenta = async(req, res) => {   

    try{
        const { id, total, tipo_pago } = req.body;
        await pool.query('INSERT INTO tb_venta (id_user, fecha, total, tipo_pago) VALUES (?, now(), ?, ?)', [id, total, tipo_pago]);
        const [maxVenta] = await pool.query(' SELECT MAX(id_venta) AS id FROM tb_venta ')
        let ventaId = maxVenta[0].id; 

        const [carritosActivos] = await pool.query('SELECT id_carrito AS id FROM tb_carrito WHERE id_user = ? AND _status = 1 ', [id])
        if(carritosActivos.length != 0){
            let carritoId = carritosActivos[0].id;

            await pool.query('UPDATE tb_carrito SET _status = 0 WHERE id_carrito = ?', [carritoId])
            const [rows] = await pool.query('SELECT p.id_user, c.id_producto, c.cantidad_producto AS cantidad, p.precio AS precio_u, p.precio * c.cantidad_producto AS total_price FROM tb_carrito_producto c INNER JOIN tb_producto p on c.id_producto = p.id_producto WHERE c.id_carrito = ?', [carritoId])
            for (const row of rows) {

                const { id_user, id_producto, cantidad, precio_u, total_price } = row;
                await pool.query('INSERT INTO tb_ventas_detalle (id_venta, id_vendedor, id_producto, fecha, cantidad, precio_u, subtotal) VALUES (?, ?, ?, now(), ?, ?, ?)',
                [ventaId, id_user, id_producto, cantidad, precio_u, total_price]);

            }
        }

        res.status(200).json('success');

    }catch(err){
        console.log(err)
        return res.status(500).send('Algo salió mal. Por favor intente de nuevo');
    }

}


export const getAllVentas = async(req, res) => {

    const [rows] = await pool.query('SELECT id_venta, id_user, fecha from tb_venta');

    res.status(200).json(rows);
}

export const getVentaId = async(req, res) => {

    const { id } = req.params;

    const [rows] = await pool.query('SELECT id_categoria, nombre, descripcion FROM tb_categoria WHERE id_categoria = ?', [id]);

    res.status(200).json(rows);
}

export const getVentaD = async(req, res) => {

    const { id } = req.params; //Id_venta

    const [rows] = await pool.query('SELECT p.nombreP, v.cantidad, v.precio_u FROM tb_ventas_detalle v INNER JOIN tb_producto p on v.id_producto = p.id_producto WHERE v.id_venta = ?', [id]);

    res.status(200).json(rows);
} 

export const deleteVenta = async(req, res) => {

    const { id } = req.params;

    await pool.query('DELETE FROM tb_categoria WHERE id_categoria = ?', [id]);

    res.status(200).json('succesfull');
}
