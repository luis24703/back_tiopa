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
exports.editStudents = exports.getStudents = void 0;
const Users_1 = __importDefault(require("../models/Users"));
//Obtener alumnos
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Users_1.default.find().where({ rol: 'ALUMNO' }).sort({ nombre: 1 });
        res.status(200).json({ students: students });
    }
    catch (error) {
        res.status(500).json({ message: "Error del servidor.", error });
    }
});
exports.getStudents = getStudents;
//Editar Alumno
const editStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editarAlumno = req.body;
        yield Users_1.default.findByIdAndUpdate({ _id: req.params.idUser }, editarAlumno);
        res.status(200).json({ message: "Alumno actualizado." });
    }
    catch (error) {
        res.status(500).json({ message: "Error del servidor.", error });
        console.log(error);
    }
});
exports.editStudents = editStudents;
//# sourceMappingURL=Student.controller.js.map