// Acá traigo la conexión a la base de datos que armé en database.js
import { pool } from './database.js';

class UsuarioController {

  // Reed
  // Esta función la hago para traer todos los usuarios que tengo guardados
  async getAll(req, res) {
    // Hago la consulta para sacar todos los usuarios
    const [result] = await pool.query('SELECT * FROM usuarios');
    // Y les mando la data en JSON para que la usen donde quieran
    res.json(result);
  }

  // Add
  // Esta función la uso para agregar un usuario nuevo a la base
  async add(req, res) {
    // Primero agarro los datos que me mandan en el body del request
    const usuario = req.body;
    // Meto esos datos en la tabla usuarios, usando los signos ? para evitar quilombos de seguridad
    const [result] = await pool.query(
      `INSERT INTO usuarios (apellido, nombre, usuario, email, pass)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario.apellido, usuario.nombre, usuario.usuario, usuario.email, usuario.pass]
    );
    // Cuando termino, les devuelvo el ID que me dio la base al guardar el usuario nuevo
    res.json({ "id insertado": result.insertId });
  }

  async delete(req, res) {
    const usuario = req.body;
    const [result] = await pool.query(
      `DELETE FROM usuarios WHERE id_usuario = ?`,
      [usuario.id_usuario]
    );
    res.json({ "Registro eliminado": result.affectedRows });
  }

  async update(req, res) {
    const usuario = req.body;
    const [result] = await pool.query(
      `UPDATE usuarios 
     SET apellido = ?, nombre = ?, usuario = ?, email = ?, pass = ?
     WHERE id_usuario = ?`,
      [usuario.apellido, usuario.nombre, usuario.usuario, usuario.email, usuario.pass, usuario.id_usuario]
    );
    res.json({ "id Usuario Actualizado": result.changedRows });
  }

}

// Exporto esta clase para usarla en otras partes del proyecto
export const usuario = new UsuarioController();