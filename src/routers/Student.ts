import { Router } from 'express';

const router: Router = Router();

import {  editStudents, getStudents } from '../controllers/Student.controller';

router.get('/', getStudents);

router.put('/editarAlumno/:idUser', editStudents)


export default router;