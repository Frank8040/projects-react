import express, { Application } from 'express';
import cors from 'cors'; // Importa el paquete cors
import indexRoutes from './routes/index';
import path from 'path';
import { createCategory } from './controllers/category.controller';

const app: Application = express();

// Middlewares
app.use(cors()); // Habilita el acceso CORS para todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Define la carpeta de imágenes como una ruta estática
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
app.use(indexRoutes);

const port = 3000;
app.listen(port, () => {
    console.log('Server on port', port);
});
