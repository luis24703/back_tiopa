import { Request, Response } from 'express';

import UserModel, {IUser} from '../models/Users';

//Obtener alumnos
export const getStudents = async (req: Request, res:Response) => {
    try {
        const students = await UserModel.find().where({rol: 'ALUMNO'}).sort({nombre:1});
        res.status(200).json({students: students});
    } catch (error) {
        res.status(500).json({message: "Error del servidor.", error});
    }
}