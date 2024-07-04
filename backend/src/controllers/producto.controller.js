import { pool } from "../db.js";
import fs from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postProducto = async(req, res) => {   
    
    const { id_user, nombreP, descripcion, precio, cant_disp, Categoria } = req.body;

   
    const userId = parseInt(id_user);
    const parsedPrecio = parseFloat(precio);
    const parsedCantDisp = parseInt(cant_disp);
    const parsedCat = parseInt(Categoria);

    let imageBuffer = null;
    if (req.file) {
        const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
        imageBuffer = fs.readFileSync(imagePath);
    }

    console.log(parsedCat)
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');


    await pool.query('INSERT INTO tb_producto (id_user, nombreP, descripcion, precio, cant_disp, Categoria, regdate, img_prod) VALUES (?,?,?,?,?,?,?,?)', [userId, nombreP, descripcion, parsedPrecio, parsedCantDisp, parsedCat, formattedDate, imageBuffer]);

    res.status(200).json('success');
}



export const getOwnProducto = async(req, res) => {

    const [rows] = await pool.query('SELECT id_user, nombreP, descripcion, precio, cant_disp, Categoria, regdate FROM tb_producto WHERE id_user = ? OR _status = 1', [id_user]);

    res.status(200).json(rows);
}

export const geteditProducto = async(req, res) => {
    const { id } = req.params;

    const [rows] = await pool.query('SELECT id_producto, id_user, nombreP, descripcion, precio, cant_disp, Categoria, regdate FROM tb_producto WHERE id_producto = ?', [id]);

    res.status(200).json(rows[0]);
}



export const getProducto = async(req, res) => {
    
        try {
          const [rows] = await pool.query(
            'SELECT id_producto, id_user, nombreP, descripcion, precio, img_prod, cant_disp, Categoria, regdate FROM tb_producto WHERE _status = 1'
          );
    
          res.status(200).json(rows);
        } catch (error) {
          console.error('Error en la consulta SQL:', error);
          res.status(500).json({ error: 'Error en el servidor' });
        }
    
} 

export const putProducto = async(req, res) => {
    
    const { id } = req.params;
    const { nombreP, descripcion, precio, cant_disp } = req.body;

    const parsedId = parseInt(id);
    const parsedPrecio = parseFloat(precio);
    const parsedCantDisp = parseInt(cant_disp);

    let imageBuffer = null;

    if (req.file) {
        const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
        imageBuffer = fs.readFileSync(imagePath);
    }

    await pool.query('UPDATE tb_producto SET nombreP = ?, descripcion = ?, precio = ?, img_prod = ?, cant_disp = ? WHERE id_producto = ?', [nombreP, descripcion, parsedPrecio, imageBuffer, parsedCantDisp, parsedId]);

    res.status(200).json('succesfull');
}

export const deleteProducto = async(req, res) => {
    const { id } = req.params;

    await pool.query('UPDATE tb_producto SET _status = 0 WHERE id_producto = ?', [id]);

    res.status(200).json('succesfull');
}
