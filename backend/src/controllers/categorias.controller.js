import { pool } from "../db.js";

export const postCategoria = async(req, res) => {   
    
    const { nombre, descripcion } = req.body;
    await pool.query('INSERT INTO tb_categoria (nombre, descripcion) VALUES (?,?)', [nombre, descripcion]);
    res.status(200).json('success');

}


export const getAllCategorias = async(req, res) => {

    const [rows] = await pool.query('SELECT id_categoria, nombre, descripcion from tb_categoria WHERE status_ = 1');

    res.status(200).json(rows);
}

export const getCategoriaId = async(req, res) => {

    const { id } = req.params;

    const [rows] = await pool.query('SELECT id_categoria, nombre, descripcion FROM tb_categoria WHERE id_categoria = ?', [id]);

    res.status(200).json(rows[0]);
}

export const getCategoriaNombre = async(req, res) => {

    const { nombre } = req.params;

    const [rows] = await pool.query('SELECT id_categoria, nombre, descripcion FROM tb_categoria WHERE nombre = ?', [nombre]);

    res.status(200).json(rows);
} 

export const deleteCategoria = async(req, res) => {

    const { id } = req.body;

    await pool.query('UPDATE tb_categoria SET status_ = 0 WHERE id_categoria = ?', [id]);

    res.status(200).json('succesfull');
}

export const EditCategoria = async(req, res) => {
    const { nombre, descripcion, id } = req.body;

    await pool.query('UPDATE tb_categoria SET nombre = ?, descripcion = ? WHERE id_categoria = ?', [nombre, descripcion, id]);

    res.status(200).json('succesfull');
}
