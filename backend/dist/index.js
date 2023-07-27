"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importa el paquete cors
const index_1 = __importDefault(require("./routes/index"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)()); // Habilita el acceso CORS para todas las rutas
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Define la carpeta de imágenes como una ruta estática
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'public', 'uploads')));
// Routes
app.use(index_1.default);
const port = 3000;
app.listen(port, () => {
    console.log('Server on port', port);
});
