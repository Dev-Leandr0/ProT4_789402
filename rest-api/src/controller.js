import { pool } from './database.js';

class UsuarioController {

  async getAll(req, res) {
    const [result] = await pool.query('SELECT * FROM usuarios');
    res.json(result);
  }

  async add(req, res) {
    const usuario = req.body;
    const [result] = await pool.query(
      `INSERT INTO usuarios (apellido, nombre, usuario, email, pass)
   VALUES (?, ?, ?, ?, ?)`,
      [usuario.apellido, usuario.nombre, usuario.usuario, usuario.email, usuario.pass]
    );
    res.json({ "id insertado": result.insertId });
  }
}

export const usuario = new UsuarioController();