# REST API - Biblioteca de Libros

Este repositorio contiene una API REST para gestionar una biblioteca de libros, construida con Node.js, Express y MySQL.

---

## Estructura del proyecto

rest-api/
├── node_modules/            # Dependencias instaladas
├── script/                  # Scripts SQL para crear la base y datos de prueba
│   ├── modelo_datos.sql     # Script para crear la tabla libros
│   └── datos_prueba.sql     # Script para insertar datos de prueba
├── src/                     # Código fuente del backend
│   ├── controller.js        # Lógica de los endpoints
│   ├── database.js          # Configuración y conexión a la base de datos
│   ├── index.js             # Archivo principal para arrancar el servidor
│   └── routes.js            # Definición de rutas de la API
├── package.json             # Configuración y scripts de npm
├── package-lock.json        # Versiones fijas de dependencias
└── README.md                # Documentación del proyecto

---

## Requisitos previos

- Tener instalado Node.js (versión recomendada 16+)
- Tener instalado MySQL o MariaDB
- Tener Postman o similar para probar la API (opcional)

---

## Configuración

1. **Clonar el repositorio**

```bash
git clone https://github.com/Dev-Leandr0/ProT4_789402/edit/api-rest
cd rest-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la base de datos**

- Crear una base de datos vacía en MySQL para este proyecto (por ejemplo biblioteca).
- Ejecutar los scripts SQL para crear la tabla y cargar datos de prueba:

```bash
mysql -u tu_usuario -p biblioteca < script/modelo_datos.sql
mysql -u tu_usuario -p biblioteca < script/datos_prueba.sql
```

---

## Ejecutar la API

Para arrancar el servidor en modo desarrollo (con recarga automática si hacés cambios):

```bash
npm run dev
```
- Deberías ver un mensaje en consola indicando que el servidor está corriendo (ejemplo: Server running on port 3000).

---

## Endpoints disponibles

| Método | Ruta    | Descripción                   | Parámetros                    |
| ------ | ------- | ----------------------------- | ----------------------------- |
| GET    | /libros | Obtener todos los libros      | Ninguno                       |
| GET    | /libro  | Obtener un libro por ID       | `id` (query param)            |
| POST   | /libro  | Agregar un nuevo libro        | JSON con datos del libro      |
| PUT    | /libro  | Actualizar un libro existente | JSON con datos (incluye `id`) |
| DELETE | /libro  | Eliminar un libro             | JSON con `id` del libro       |

---

## Ejemplo para probar con Postman (POST /libro)
- URL: http://localhost:3000/libro
- Método: POST
- Body (raw, JSON):

```bash
{
  "nombre": "El amor en los tiempos del cólera",
  "autor": "Gabriel García Márquez",
  "categoria": "Novela",
  "anio_publicacion": "1985-09-01",
  "ISBN": "9780307389732"
}
```
---

## Notas

- El campo ISBN es único, no se permiten duplicados.

- Los campos nombre, autor y categoria admiten hasta 30 caracteres.

- El campo anio_publicacion debe respetar el formato YYYY-MM-DD.

- El campo id_libro es autoincremental y se genera automáticamente.
