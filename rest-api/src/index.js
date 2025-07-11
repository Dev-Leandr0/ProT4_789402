// Traigo express para levantar el servidor
import express from 'express';

// Traigo morgan para ver en consola las peticiones que llegan (logueo)
import morgan from 'morgan';

// Traigo el router que armé con todas las rutas del servidor
import { router } from './routes.js';

// Creo la app de express
const app = express();

// Le pongo el puerto donde va a correr el servidor
app.set('port', 3000);

// Le meto morgan para que me muestre en consola qué peticiones están llegando (modo dev)
app.use(morgan('dev'));

// Le digo que va a entender y convertir los datos JSON que le mandan en las peticiones (para usar req.body)
app.use(express.json());

// Le paso el router con todas las rutas armadas para que las use
app.use(router);

// Arranco el servidor en el puerto que definí arriba y muestro por consola que está andando
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});