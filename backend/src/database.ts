import { createPool, Pool, PoolConnection } from 'mysql2/promise';

// Configurar la conexión a la base de datos MySQL
export const pool: Pool = createPool({
  host: '127.0.0.1', // Cambiar al host de tu servidor MySQL, generalmente 'localhost' si estás usando Laragon localmente.
  user: 'root',      // Cambiar al usuario de tu base de datos MySQL.
  password: '',      // Coloca la contraseña de tu base de datos MySQL si la tienes, de lo contrario, deja esto como una cadena vacía.
  database: 'tbusuarios', // Cambia al nombre de la base de datos que deseas utilizar en MySQL.
  port: 3306         // Cambia al número de puerto correcto de tu servidor MySQL (por defecto, el puerto de MySQL es 3306).
});

export const getConnection = async (): Promise<PoolConnection> => {
  return await pool.getConnection();
};
