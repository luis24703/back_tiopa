"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Workshop_controller_1 = require("../controllers/Workshop.controller");
router.route('/').get(Workshop_controller_1.getAllWorkshops);
router.route('/:idTeacher').post(Workshop_controller_1.createWorkshop).get(Workshop_controller_1.getWorkshops);
router.route('/:idWorkshop/alumno/:idStudent').post(Workshop_controller_1.inscriptionsStudentsWorkshop);
router.route('/:idWorkshop/alumnos').get(Workshop_controller_1.getStudentsWorkshop);
router.route('/:idWorkshop/asistencia').post(Workshop_controller_1.addAssistencesWorkshop);
router.route('/:idWorkshop/asistencias').get(Workshop_controller_1.getAssistencesWorkshop);
router.route('/:idWorkshop/verificarAsistenciaFecha').post(Workshop_controller_1.checkHaveAssistenceDate);
exports.default = router;
//# sourceMappingURL=Workshop.js.map