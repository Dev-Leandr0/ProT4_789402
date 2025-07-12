// Acá traigo la conexión a la base de datos que armé en database.js
import { pool } from './database.js';

class LibroController {

  // Read
  // Esta función la hago para traer todos los libros que tengo guardados
  async getAll(req, res) {
    try {
      // Hago la consulta para sacar todos los libros
      const [result] = await pool.query('SELECT * FROM libros');
      // Y les mando la data en JSON para que la usen donde quieran
      res.json(result);
    } catch (error) {
      // Si algo sale mal (por ejemplo, si no anda la base de datos), caigo acá
      console.error('Error al obtener los libros:', error.message);
      // Mando un mensajito avisando que hubo un problema
      res.status(500).json({ error: 'Error interno del servidor' });
    }
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
    try {
      // Primero agarro los datos que me mandan en el body del request
      const libro = req.body;

      // Acá chequeo que vengan los campos mínimos que necesito,
      // si falta alguno, aviso y no hago la consulta
      const camposNecesarios = ['nombre', 'autor', 'categoria', 'anio_publicacion', 'ISBN'];
      for (const campo of camposNecesarios) {
        if (!libro[campo]) {
          return res.status(400).json({ error: `Falta el campo ${campo}` });
        }
      }

      // Meto esos datos en la tabla libros, usando los signos ? para evitar quilombos de seguridad
      const [result] = await pool.query(
        `INSERT INTO libros (nombre, autor, categoria, anio_publicacion, ISBN)
       VALUES (?, ?, ?, ?, ?)`,
        [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]
      );

      // Cuando termino, les devuelvo el ID que me dio la base al guardar el usuario nuevo
      res.json({ "id insertado": result.insertId });
    } catch (error) {
      // Si algo sale mal, como que me manden datos que no entiendo o falla la base
      console.error('Error al agregar un libro:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      // Agarro el id_libro que me mandan para eliminar
      const libro = req.body;

      // Primero verifico que me hayan mandado el id_libro
      if (!libro.id_libro) {
        return res.status(400).json({ error: 'Falta el campo id_libro' });
      }

      // Intento eliminar el libro con ese id
      const [result] = await pool.query(
        `DELETE FROM libros WHERE id_libro = ?`,
        [libro.id_libro]
      );

      // Si no afectó ninguna fila, quiere decir que no existía ese libro
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No se encontró un libro con ese id' });
      }

      // Si llegó hasta acá, eliminé bien
      res.json({ "Registro eliminado": result.affectedRows });
    } catch (error) {
      // Si pasa cualquier error raro, lo agarro acá
      console.error('Error al eliminar el libro:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


  async update(req, res) {
    try {
      // Agarro los datos que me mandan para actualizar
      const libro = req.body;

      // Chequeo que me hayan mandado el id_libro para saber qué libro actualizar
      if (!libro.id_libro) {
        return res.status(400).json({ error: 'Falta el campo id_libro' });
      }

      // Chequeo que vengan los demás campos que necesito para actualizar
      const camposNecesarios = ['nombre', 'autor', 'categoria', 'anio_publicacion', 'ISBN'];
      for (const campo of camposNecesarios) {
        if (!libro[campo]) {
          return res.status(400).json({ error: `Falta el campo ${campo}` });
        }
      }

      // Intento actualizar el libro con los datos recibidos
      const [result] = await pool.query(
        `UPDATE libros 
       SET nombre = ?, autor = ?, categoria = ?, anio_publicacion = ?, ISBN = ?
       WHERE id_libro = ?`,
        [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id_libro]
      );

      // Si no se cambió ninguna fila, puede ser que el id no exista o que los datos sean iguales
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No se encontró un libro con ese id' });
      }

      // Respondo con la cantidad de filas modificadas (cambios hechos)
      res.json({ "id Libro Actualizado": result.changedRows });
    } catch (error) {
      // Si pasa cualquier error inesperado, lo atrapo acá
      console.error('Error al actualizar el libro:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

}

// Exporto esta clase para usarla en otras partes del proyecto
export const libro = new LibroController();