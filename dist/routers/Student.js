"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Student_controller_1 = require("../controllers/Student.controller");
router.get('/', Student_controller_1.getStudents);
router.put('/editarAlumno/:idUser', Student_controller_1.editStudents);
exports.default = router;
//# sourceMappingURL=Student.js.map