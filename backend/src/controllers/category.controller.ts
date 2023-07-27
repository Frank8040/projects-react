import { Request, Response } from 'express';
import { getConnection } from '../database';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM categories ORDER BY id ASC');
    connection.release();
    return res.status(200).json(rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM categories WHERE id = ?', [id]);
  connection.release();
  return res.json(rows);
};

export const createCategory = async (req: Request, res: Response) => {
  const { nombre, apellidos, pais } = req.body;

  // Verifica que los campos requeridos no estén vacíos
  if (!nombre || !apellidos || !pais) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Verifica si hay una imagen en la solicitud
  if (req.file) {
    // La imagen está presente en el FormData
    const imageExtension = path.extname(req.file.originalname);
    const validExtensions = ['.png', '.jpg', '.jpeg'];

    if (!validExtensions.includes(imageExtension)) {
      return res.status(400).json('Solo se permiten archivos con extensiones .png, .jpg y .jpeg');
    }

    const filename = uuidv4(); // Genera un nombre único para la imagen
    const imagePath = path.join(__dirname, '/public/uploads', `${filename}${imageExtension}`);

    try {
      // Verifica si la carpeta de destino existe, de lo contrario, créala
      const uploadDir = path.join(__dirname, '/public/uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Mueve la imagen desde la ubicación temporal a la ubicación definitiva en el servidor
      fs.renameSync(req.file.path, imagePath);

      // Construye la URL completa para acceder a la imagen
      const baseUri = req.protocol + '://' + req.get('host');
      const imagenPath = `https://172.27.192.1:3000/uploads/${filename}${imageExtension}`;

      // Guarda la URL de la imagen en la base de datos
      const connection = await getConnection();
      const [result] = await connection.query('INSERT INTO categories (nombre, apellidos, pais, imagen) VALUES (?, ?, ?, ?)', [nombre, apellidos, pais, imagenPath]);
      connection.release();

      res.json({
        message: 'User Added successfully',
        body: {
          user: { nombre, apellidos, pais, imagen: imagenPath }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json('Error al guardar la imagen');
    }
  } else {
    // Si no se envió una imagen, crea la categoría sin imagen
    const connection = await getConnection();
    const [result] = await connection.query('INSERT INTO categories (nombre, apellidos, pais) VALUES (?, ?, ?)', [nombre, apellidos, pais]);
    connection.release();

    res.json({
      message: 'User Added successfully',
      body: {
        user: { nombre, apellidos, pais, imagen: null }
      }
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nombre, apellidos, pais, imagen } = req.body;

  const connection = await getConnection();
  await connection.query('UPDATE categories SET nombre = ?, apellidos = ?, pais = ?, imagen = ? WHERE id = ?', [nombre, apellidos, pais, imagen, id]);
  connection.release();
  res.json('Category Updated Successfully');
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const connection = await getConnection();
  await connection.query('DELETE FROM categories where id = ?', [id]);
  connection.release();
  res.json(`Category ${id} deleted Successfully`);
};
