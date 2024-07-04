import { pool } from "../db.js";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

export const postUser = async (req, res) => {

    const { usuario, correo, contrasena, nombre, apellidoP,  fnacimiento, sexo, rol } = req.body;

    const date = new Date();
    const regDate = date.toISOString().slice(0, 19).replace('T', ' ');
    
    let contrasenaHaash = await bcryptjs.hash(contrasena, 8);
    
    try {

        await pool.query('INSERT INTO tb_user (usuario, correo, contrasena, nombre, apellido_p, fecha_n, sexo, rol, regdate) VALUES (?,?,?,?,?,?,?,?,?)', 
        [usuario, correo, contrasenaHaash, nombre, apellidoP, fnacimiento, sexo, rol, regDate]);

        res.status(200).json('succesfull');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json('error');
    }
}

export const postUserlogin = async (req, res) => {

    const { usuario, contrasena } = req.body

    const [rows] = await pool.query('SELECT * FROM tb_user WHERE usuario = ?', [usuario])

    if (rows.length <= 0){
        return res.status(401).json('Usuario o contraseña incorrectos');
    }

    const user = rows[0];

    if (!user){
        return res.status(401).json('Usuario o contraseña incorrectos');
    } else {
        const token = jwt.sign({ user }, 'my_secret_key')
        res.status(200).json({ token });

    }
}

export const protectedLogin = async (req, res) => {
    res.json({
         text: 'protected'
    }) 
}

export const getCurrentUser = (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err, data) => {
       if(err) {
           res.status(403).json({ error: 'Token inválido' });
       } else {
           res.json ({ data });
       }
    })
}

export const putUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellidoP, usuario, correo } = req.body;

    const id_user = parseInt(id)


    try {
        await pool.query('UPDATE tb_user SET usuario = ?, correo = ?, nombre = ?, apellido_P = ? WHERE id_user = ?', 
        [ usuario, correo, nombre, apellidoP, id_user])

        res.status(200).json('succesfull');

    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json('error');

    }

}

export const putDeleteUser = async (req, res) => {
    const { id } = req.params;
    const { _status = 0 } = req.body;

    try {
        await pool.query('UPDATE tb_user SET _status = ? WHERE id_user = ?', [_status, id])

        res.status(200).json('succesfull');

    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json('error');

    }

}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM tb_user WHERE id_user = ?', [id])
        res.status(200).json('success');

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json('error');

    }
}

export function ensuretoken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
  
  
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    }
    else {
      res.sendStatus(403)
    }
    
}

export const getEditUser = async (req, res) => {
    const { id } = req.params;

    const [row] = await pool.query('SELECT * FROM tb_user WHERE id_user = ?', [id])

    res.status(200).json(row[0]);

}

