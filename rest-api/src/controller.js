// Acá traigo la conexión a la base de datos que armé en database.js
import { pool } from './database.js';

class LibroController {

  // Reed
  // Esta función la hago para traer todos los libros que tengo guardados
  async getAll(req, res) {
    // Hago la consulta para sacar todos los libros
    const [result] = await pool.query('SELECT * FROM libros');
    // Y les mando la data en JSON para que la usen donde quieran
    res.json(result);
  }

  async getOne(req, res) {
    try {
      // Primero agarro el ID del libro que me mandan por la URL (por ejemplo: /libro?id=3)
      const { id } = req.query;

      // Si no me mandaron ningún ID, devuelvo un error diciendo que falta
      if (!id) {
        return res.status(400).json({ error: 'Falta el parámetro id' });
      }

      // Ahora le pregunto a la base de datos si tiene un libro con ese ID
      const [rows] = await pool.query('SELECT * FROM libros WHERE id_libro = ?', [id]);

      // Si no encontró nada, aviso que no existe ningún libro con ese ID
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }

      // Si lo encontró, devuelvo ese libro en formato JSON
      res.json(rows[0]);

    } catch (error) {
      // Si algo sale mal en todo este proceso, lo muestro por consola y aviso que hubo un error
      console.error(error);
      res.status(500).json({ error: 'Error al buscar el libro' });
    }
  }

  // Add
  // Esta función la uso para agregar un libro nuevo a la base
  async add(req, res) {
    // Primero agarro los datos que me mandan en el body del request
    const libro = req.body;
    // Meto esos datos en la tabla libros, usando los signos ? para evitar quilombos de seguridad
    const [result] = await pool.query(
      `INSERT INTO libros (nombre, autor, categoria, anio_publicacion, ISBN)
       VALUES (?, ?, ?, ?, ?)`,
      [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]
    );
    // Cuando termino, les devuelvo el ID que me dio la base al guardar el usuario nuevo
    res.json({ "id insertado": result.insertId });
  }

  async delete(req, res) {
    const libro = req.body;
    const [result] = await pool.query(
      `DELETE FROM libros WHERE id_libro = ?`,
      [libro.id_libro]
    );
    res.json({ "Registro eliminado": result.affectedRows });
  }

  async update(req, res) {
    const libro = req.body;
    const [result] = await pool.query(
      `UPDATE libros 
     SET nombre = ?, autor = ?, categoria = ?, anio_publicacion = ?, ISBN = ?
     WHERE id_libro = ?`,
      [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id_libro]
    );
    res.json({ "id Libro Actualizado": result.changedRows });
  }

}

// Exporto esta clase para usarla en otras partes del proyecto
export const libro = new LibroController();