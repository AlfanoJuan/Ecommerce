import { pool } from '../db.js';

export const getCarritoTotal = async (req, res) => {
   
    const {id} = req.params //Id del carrito

    const [rows] = await pool.query('SELECT p.precio * c.cantidad_producto AS total_price FROM tb_carrito_producto c INNER JOIN tb_producto p on c.id_producto = p.id_producto WHERE c.id_carrito = ?', [id])
    if(rows.length != 0){
        const totalPrecio = rows.reduce((total, producto) => total + producto.total_price, 0);
        res.status(200).json(totalPrecio);
    }
    else{
        res.json('No hay ningun carrito activo')
    }

}

export const getCarritoId = async (req, res) => {
   
    const {id} = req.params //Id del carrito

    const [rows] = await pool.query(' SELECT id_carrito, id_user, fecha, _status FROM tb_carrito WHERE id_carrito = ?', [id])
    if(rows.length != 0){
        res.status(200).json(rows);
    }
    else{
        res.json('No hay ningun carrito activo')
    }

}


export const getCarritoA = async (req, res) => {
   
    const {id} = req.params //Id el usuario

    const [rows] = await pool.query(' SELECT id_carrito, id_user, fecha, _status FROM tb_carrito WHERE id_user = ? AND _status = 1 ', [id])
    if(rows.length != 0){
        res.status(200).json(rows);
    }
    else{
        res.json('No hay ningun carrito activo')
    }

}

export const getCarritoD = async (req, res) => {
   
    const {id} = req.params

    const [carritosActivos] = await pool.query(' SELECT id_carrito AS id FROM tb_carrito WHERE id_user = ? AND _status = 1 ', [id])
    if(carritosActivos.length != 0){
        let carritoId = carritosActivos[0].id;
        const [rows] = await pool.query('SELECT c.id_producto, p.nombreP, p.descripcion, p.precio * c.cantidad_producto AS total_price, p.img_prod, c.cantidad_producto AS count_id_producto FROM tb_carrito_producto c INNER JOIN tb_producto p on c.id_producto = p.id_producto WHERE c.id_carrito = ? GROUP BY p.id_producto, p.nombreP, p.descripcion,p.precio, p.img_prod', [carritoId])
        res.status(200).json(rows);
    }
    else{
        res.json('No hay ningun carrito activo')
    }

}

export const postCarrito = async (req, res) => {
    const { id_post, id_user } = req.body;

    try{
        const [carritosActivos] = await pool.query(' SELECT id_carrito AS id FROM tb_carrito WHERE _status = 1 ')
        if(carritosActivos.length == 0){
            await pool.query('INSERT INTO tb_carrito ( id_user, fecha, _status ) values (?, now(), 1)', [id_user])
    
            const [maxCarrito] = await pool.query(' SELECT MAX(id_carrito) AS id FROM tb_carrito ')
            let carritoId = maxCarrito[0].id 
            await pool.query('INSERT INTO tb_carrito_producto ( id_producto, id_carrito, cantidad_producto, _status ) values (?, ?, 1, 1)', [id_post, carritoId] )
    
        }
        else{
    
            let carritoId = carritosActivos[0].id
            await pool.query('INSERT INTO tb_carrito_producto ( id_producto, id_carrito, cantidad_producto, _status ) values (?, ?, 1, 1)', [id_post, carritoId] )
            
        }
        res.json('success')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Algo salió mal. Por favor intente de nuevo');
    }
    
}

export const deleteCarrito = async (req, res) => {
    const {id} = req.params

    await pool.query(' DELETE FROM tb_carrito WHERE id_producto = ?', [id] )
    res.json('success')
}