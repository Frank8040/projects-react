"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const database_1 = require("../database");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, database_1.getConnection)();
        const [rows] = yield connection.query('SELECT * FROM categories ORDER BY id ASC');
        connection.release();
        return res.status(200).json(rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const connection = yield (0, database_1.getConnection)();
    const [rows] = yield connection.query('SELECT * FROM categories WHERE id = ?', [id]);
    connection.release();
    return res.json(rows);
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidos, pais } = req.body;
    // Verifica que los campos requeridos no estén vacíos
    if (!nombre || !apellidos || !pais) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    // Verifica si hay una imagen en la solicitud
    if (req.file) {
        // La imagen está presente en el FormData
        const imageExtension = path_1.default.extname(req.file.originalname);
        const validExtensions = ['.png', '.jpg', '.jpeg'];
        if (!validExtensions.includes(imageExtension)) {
            return res.status(400).json('Solo se permiten archivos con extensiones .png, .jpg y .jpeg');
        }
        const filename = (0, uuid_1.v4)(); // Genera un nombre único para la imagen
        const imagePath = path_1.default.join(__dirname, '/public/uploads', `${filename}${imageExtension}`);
        try {
            // Verifica si la carpeta de destino existe, de lo contrario, créala
            const uploadDir = path_1.default.join(__dirname, '/public/uploads');
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            // Mueve la imagen desde la ubicación temporal a la ubicación definitiva en el servidor
            fs_1.default.renameSync(req.file.path, imagePath);
            // Construye la URL completa para acceder a la imagen
            const baseUri = req.protocol + '://' + req.get('host');
            const imagenPath = `https://172.27.192.1:3000/uploads/${filename}${imageExtension}`;
            // Guarda la URL de la imagen en la base de datos
            const connection = yield (0, database_1.getConnection)();
            const [result] = yield connection.query('INSERT INTO categories (nombre, apellidos, pais, imagen) VALUES (?, ?, ?, ?)', [nombre, apellidos, pais, imagenPath]);
            connection.release();
            res.json({
                message: 'User Added successfully',
                body: {
                    user: { nombre, apellidos, pais, imagen: imagenPath }
                }
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json('Error al guardar la imagen');
        }
    }
    else {
        // Si no se envió una imagen, crea la categoría sin imagen
        const connection = yield (0, database_1.getConnection)();
        const [result] = yield connection.query('INSERT INTO categories (nombre, apellidos, pais) VALUES (?, ?, ?)', [nombre, apellidos, pais]);
        connection.release();
        res.json({
            message: 'User Added successfully',
            body: {
                user: { nombre, apellidos, pais, imagen: null }
            }
        });
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre, apellidos, pais, imagen } = req.body;
    const connection = yield (0, database_1.getConnection)();
    yield connection.query('UPDATE categories SET nombre = ?, apellidos = ?, pais = ?, imagen = ? WHERE id = ?', [nombre, apellidos, pais, imagen, id]);
    connection.release();
    res.json('Category Updated Successfully');
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const connection = yield (0, database_1.getConnection)();
    yield connection.query('DELETE FROM categories where id = ?', [id]);
    connection.release();
    res.json(`Category ${id} deleted Successfully`);
});
exports.deleteCategory = deleteCategory;
