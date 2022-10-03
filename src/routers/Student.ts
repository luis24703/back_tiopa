import { Router } from 'express';

const router: Router = Router();

import {  getStudents } from '../controllers/Student.controller';

router.get('/', getStudents);


export default router;