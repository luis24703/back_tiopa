import { Request, Response } from 'express';
import WorkshopModel, { IWorkShop } from '../models/Workshops';
import InscriptionsModel, { IInscription } from '../models/Inscriptions';
import AssistancesModel from '../models/Assistances';
import AssistancesWorkshopModel from '../models/AssistancesWorkshops';
import moment from 'moment';
const mongoose = require('mongoose')

//Obtener todos los talleres
export const getWorkshops = async (req: Request, res: Response) => {
    try {
        //Populate y Agreggate ???? 
        let id_teacher = req.params.idTeacher;
        let workshopsTeacher : any = {};
        workshopsTeacher = await WorkshopModel.find().where({ id_user: id_teacher });
        res.status(200).json({workshopsTeacher})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "Error del servidor.", error, body: { params: req.params.idTeacher }});
    }
}

export const getAllWorkshops = async (req: Request, res: Response) => {
    try {
        //Populate y Agreggate ???? 
        let workshopsTeacher : any = {};
        workshopsTeacher = await WorkshopModel.find().populate('id_user');
        // .sort({nombre:1})
       
        res.status(200).json({workshopsTeacher})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "Error del servidor.", error, body: { params: req.params.idTeacher }});
    }
}
//Crear un nuevo taller
export const createWorkshop = async (req: Request, res:Response) => {
    try {
        const workshop = req.body;
        if(!workshop.nombre || !workshop.fecha_inicio || !workshop.fecha_final || !workshop.horario) return res.status(404).json({message: "Datos incompletos", body: workshop});
        const newWorkshop: IWorkShop = new WorkshopModel(workshop);
        newWorkshop.id_user = req.params.idTeacher;
        await newWorkshop.save();
        res.status(200).json({message: "Maestro registrado."});
    } catch (error) {
        res.status(500).json({message: "Error del servidor.", error, body: req.body});
    }
}

//Obtener todos los estudiantes del taller
export const getStudentsWorkshop = async (req: Request, res: Response) => {
    try {
        let studentsWorkshop : any = {};
        studentsWorkshop = await InscriptionsModel.find({
            id_workshop: req.params.idWorkshop
        }).populate('id_user');
        
        res.status(200).json({estudiantes: studentsWorkshop});
    } catch (error) {
        res.status(500).json({message: "Error del servidor.", error, body: {params: req.params.idWorkshop}});
    }
}

//Obtener los alumnos que no esten en ese taller para solo agregarlos
export const getStudentsOfOtherWorkshops = async (req: Request, res: Response) => {

}

//Inscribir a alumnos al taller
export const inscriptionsStudentsWorkshop = async (req: Request, res: Response) => {
    try {
        const workshop = req.params.idWorkshop;
        const student = req.params.idStudent;
        if(!workshop || !student) return res.status(404).json({message: "Datos incompletos.", body: { id_taller: workshop, id_usuario: student }});
        const haveThisInscription = await InscriptionsModel.find({
            id_user: student,
            id_workshop: workshop
        });
       let respuesta = {};
        
       if(haveThisInscription.length){
            respuesta = {message: "El alumno ya tiene registrado este taller.", success:false};
       }else{
        const newInscription = new InscriptionsModel({
                id_user: student,
                id_workshop: workshop
            });
            await newInscription.save();
            respuesta = {message: "Alumno agregado.", success:true};
       }
      
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({message: "Error del servidor.", error, body: req.body});
    }
}

//Agregar un estudiante al taller
export const addStudentWorkshop = async (req: Request, res: Response) => {

}

//Editar alumno de un taller
export const editStudentWorkshop = async (req: Request, res: Response) => {

}

//Obtener asistencias del taller
export const getAssistencesWorkshop = async (req: Request, res: Response) => {
    try {
        //Agregar aggregate para que vayan las asistencias
        const assistence = await AssistancesModel.aggregate([
            {
                $match:{
                    id_workshop: mongoose.Types.ObjectId(req.params.idWorkshop) 
                },
            },
            {
                $lookup:{
                    from: 'assistencesworkshops',
                    localField: '_id',
                    foreignField: 'id_assistence',
                    as: 'Asistentes',
                    pipeline:[
                        {
                            $lookup:{
                                from: 'users',
                                localField: 'id_estudiante',
                                foreignField: '_id',
                                as: 'alumno'
                            },
                        },    
                        {$unwind:{path: '$alumno'}} 
                    ],
                }
            }
        ]);
    
        
        res.status(200).json({asistencias: assistence});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error del servidor.", error, body: req.body});
    }
}
export const checkHaveAssistenceDate = async (req: Request, res: Response) => {
    try {
       
        const fecha = req.body.fecha;
        const fechaHoy = moment(new Date()).format("YYYY-MM-DD")
        const isToday = moment(fechaHoy).isSame(fecha);
        
        const assistence = await AssistancesModel.aggregate([
            {
                $match:{
                    id_workshop: mongoose.Types.ObjectId(req.params.idWorkshop),
                    fecha_asistencia:fecha 
                },
            },
            {
                $lookup:{
                    from: 'assistencesworkshops',
                    localField: '_id',
                    foreignField: 'id_assistence',
                    as: 'Asistentes',
                    pipeline:[
                        {
                            $lookup:{
                                from: 'users',
                                localField: 'id_estudiante',
                                foreignField: '_id',
                                as: 'alumno'
                            },
                        },    
                        {$unwind:{path: '$alumno'}} 
                    ],
                },
            }
        ]);
        res.status(200).json({listaAsistencia: assistence, isToday: isToday });
    } catch (error) {
       
        res.status(500).json({message: "Error del servidor.", error, body: req.body});
    }
}
//Agregar una asitencia
export const addAssistencesWorkshop = async (req: Request, res: Response) => {
    try {
        const assistences = req.body.asistencia;
        const idAssistence = req.body.idAssistence;
        console.log({idAssistence})
        const fecha = req.body.fecha;
        const workshop = await WorkshopModel.findById(req.params.idWorkshop);
        
        let usersBase = [];
       
        if(!workshop) return res.status(404).json({message: "Datos incompletos", body: assistences, params: req.params.idWorkshop });
        //const today = moment().format();
        if(idAssistence !== '' && idAssistence !== undefined){
            
            for(var i = 0; i < assistences.length; i++){
                
                let idCompare = mongoose.Types.ObjectId(assistences[i].id_assistence_alumno);
                // console.log(await AssistancesWorkshopModel.find({_id:idCompare}))
                await AssistancesWorkshopModel.findByIdAndUpdate({_id:idCompare}, {assistence : assistences[i].assistence}); 
            }
        }else{
               
            const newAssistence = new AssistancesModel({
                fecha_asistencia: fecha,
                id_workshop: workshop._id,
                alumnos_total: assistences.length
            });

            for(var i = 0; i < assistences.length; i++){
        
                const new_assistencia = new AssistancesWorkshopModel({
                    id_estudiante: assistences[i]._id,
                    id_workshop: workshop._id,
                    id_teacher: workshop.id_user,
                    id_assistence: newAssistence._id,
                    assistence: assistences[i].assistence
                });
                usersBase.push(new_assistencia);
            }

            await newAssistence.save();
            usersBase.map(async user => await user.save());
        }
     
       
       
        res.status(200).json({message: "Asistencia agregada."});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error del servidor.", error, body: req.body});
    }
}

//Obtener informacion del taller
export const getInfoWorkShop = async (req: Request, res: Response) => {

}

