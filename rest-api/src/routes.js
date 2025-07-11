// Importo Router de express para armar las rutas del servidor
import { Router } from 'express';
// Traigo el controlador de usuario que tiene las funciones para manejar las peticiones
import { usuario } from './controller.js';

// Creo el router para definir las rutas
export const router = Router()

// Ruta GET para traer todos los usuarios, llama a la función getAll del controlador
router.get('/usuarios', usuario.getAll);
// Ruta POST para agregar un usuario nuevo, llama a la función add del controlador
router.post('/usuario', usuario.add);
// Ruta POST para eliminar un usuario, llama a la función delete del controlador
router.delete('/usuario', usuario.delete);
// Ruta POST para actualizar un usuario, llama a la función update del controlador
router.put('/usuario', usuario.update);