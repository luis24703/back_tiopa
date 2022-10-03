import { Request, Response } from 'express';

import UserModel, {IUser} from '../models/Users';

//Crear amestros
export const createTeacher = async ( req: Request, res: Response ) => {
    try {
        const teacher = req.body;
        const userExist = await UserModel.findOne({correo: req.body.correo});
        if(userExist) throw new Error("Este usuario ya existe");
        
        const newTeacher: IUser = new UserModel(teacher);
        newTeacher.password = await newTeacher.encryptPassword(newTeacher.password);
        newTeacher.admin = false;
       // newTeacher.rol = 'MAESTRO';
        await newTeacher.save();
        res.status(200).json({message: "Maestro registrado."});
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "Error del servidor.", error: error.message  , body: req.body});
    }
}

//Obtener maestros
export const getTeachers = async (req: Request, res:Response) => {
    try {
        const teachers = await UserModel.find().where({rol: 'MAESTRO'}).sort({nombre:1});
        res.status(200).json({maestros: teachers});
    } catch (error) {
        res.status(500).json({message: "Error del servidor.", error});
    }
}


//Editar maestros


//Elinar maestros

