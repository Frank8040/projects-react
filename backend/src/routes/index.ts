import { Router } from 'express';
import multer from 'multer';
import path from 'path';
const router = Router();

import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/index.controller';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.controller';

// Configurar la ubicación donde se guardarán las imágenes subidas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads')); // Ruta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', upload.single('imagen'), createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;