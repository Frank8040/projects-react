import { Request, Response } from 'express';
import { getConnection } from '../database';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM users ORDER BY id ASC');
    connection.release();
    return res.status(200).json(rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json('Internal Server error');
  }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
  connection.release();
  return res.json(rows);
};

export const createUser = async (req: Request, res: Response) => {
  const { nombre, apellidos, pais } = req.body;
  const connection = await getConnection();
  const [result] = await connection.query('INSERT INTO users (nombre, apellidos, pais) VALUES (?, ?, ?)', [nombre, apellidos, pais]);
  connection.release();
  res.json({
    message: 'User Added successfully',
    body: {
      user: { nombre, apellidos, pais }
    }
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nombre, apellidos, pais } = req.body;

  const connection = await getConnection();
  await connection.query('UPDATE users SET nombre = ?, apellidos = ?, pais = ? WHERE id = ?', [nombre, apellidos, pais, id]);
  connection.release();
  res.json('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const connection = await getConnection();
  await connection.query('DELETE FROM users where id = ?', [id]);
  connection.release();
  res.json(`User ${id} deleted Successfully`);
};
