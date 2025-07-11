// Importo Router de express para armar las rutas del servidor
import { Router } from 'express';
// Traigo el controlador de libro que tiene las funciones para manejar las peticiones
import { libro } from './controller.js';

// Creo el router para definir las rutas
export const router = Router()

// Ruta GET para traer todos los libros, llama a la función getAll del controlador
router.get('/libros', libro.getAll);

// Ruta GET para obtener un libro por ID
router.get('/libro', libro.getOne);

// Ruta POST para agregar un libro nuevo, llama a la función add del controlador
router.post('/libro', libro.add);

// Ruta POST para eliminar un libro, llama a la función delete del controlador
router.delete('/libro', libro.delete);

// Ruta POST para actualizar un libro, llama a la función update del controlador
router.put('/libro', libro.update);