// Importo el módulo mysql2 con soporte para promesas para manejar la base de datos
import mysqlConnection from 'mysql2/promise';

// Acá defino los datos para conectarme a la base de datos
const properties = {
  host: 'localhost',  // La base está en mi compu (localhost)
  user: 'root',       // Usuario que uso para entrar a la base
  password: '',       // Como no le puse contraseña, queda vacío
  database: 'biblioteca' // Nombre de la base de datos que uso
};

// Creo un pool de conexiones para manejar mejor las consultas y exporto eso
export const pool = mysqlConnection.createPool(properties);