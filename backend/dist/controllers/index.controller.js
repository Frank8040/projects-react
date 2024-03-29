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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, database_1.getConnection)();
        const [rows] = yield connection.query('SELECT * FROM users ORDER BY id ASC');
        connection.release();
        return res.status(200).json(rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const connection = yield (0, database_1.getConnection)();
    const [rows] = yield connection.query('SELECT * FROM users WHERE id = ?', [id]);
    connection.release();
    return res.json(rows);
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellidos, pais } = req.body;
    const connection = yield (0, database_1.getConnection)();
    const [result] = yield connection.query('INSERT INTO users (nombre, apellidos, pais) VALUES (?, ?, ?)', [nombre, apellidos, pais]);
    connection.release();
    res.json({
        message: 'User Added successfully',
        body: {
            user: { nombre, apellidos, pais }
        }
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { nombre, apellidos, pais } = req.body;
    const connection = yield (0, database_1.getConnection)();
    yield connection.query('UPDATE users SET nombre = ?, apellidos = ?, pais = ? WHERE id = ?', [nombre, apellidos, pais, id]);
    connection.release();
    res.json('User Updated Successfully');
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const connection = yield (0, database_1.getConnection)();
    yield connection.query('DELETE FROM users where id = ?', [id]);
    connection.release();
    res.json(`User ${id} deleted Successfully`);
});
exports.deleteUser = deleteUser;
