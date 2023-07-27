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
exports.getConnection = exports.pool = void 0;
const promise_1 = require("mysql2/promise");
// Configurar la conexión a la base de datos MySQL
exports.pool = (0, promise_1.createPool)({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tbusuarios',
    port: 3306 // Cambia al número de puerto correcto de tu servidor MySQL (por defecto, el puerto de MySQL es 3306).
});
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield exports.pool.getConnection();
});
exports.getConnection = getConnection;
