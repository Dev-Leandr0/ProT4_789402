CREATE TABLE libros (
    id_libro INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    autor VARCHAR(30),
    categoria VARCHAR(30),
    anio_publicacion DATE,
    ISBN VARCHAR(13) UNIQUE
);