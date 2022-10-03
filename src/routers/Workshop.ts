import { Router } from 'express';

const router: Router = Router();

import { createWorkshop, getWorkshops, getAllWorkshops, inscriptionsStudentsWorkshop, getStudentsWorkshop, addAssistencesWorkshop, getAssistencesWorkshop, checkHaveAssistenceDate } from '../controllers/Workshop.controller';

router.route('/').get(getAllWorkshops);

router.route('/:idTeacher').post(createWorkshop).get(getWorkshops);

router.route('/:idWorkshop/alumno/:idStudent').post(inscriptionsStudentsWorkshop);

router.route('/:idWorkshop/alumnos').get(getStudentsWorkshop);

router.route('/:idWorkshop/asistencia').post(addAssistencesWorkshop);

router.route('/:idWorkshop/asistencias').get(getAssistencesWorkshop);

router.route('/:idWorkshop/verificarAsistenciaFecha').post(checkHaveAssistenceDate);


export default router;