import { Router } from 'express';
import { sedeActividadController } from '../controllers/sede-actividad.js';
import { authAdmin } from '../middleware/auth.js';

export const sedeActividadRouter = Router();

// url/sede-actividades?idSede=1 --> Devuelve todas las actividades de la sede con id 1
// url/sede-actividades?idActividad=1 --> Devuelve todos las sedes que contienen la actividad con id 1
sedeActividadRouter.get('/', sedeActividadController.getAll);

sedeActividadRouter.get('/:id', sedeActividadController.getById);

sedeActividadRouter.post('/', authAdmin, sedeActividadController.create);

sedeActividadRouter.patch('/:id', authAdmin, sedeActividadController.update);

sedeActividadRouter.delete('/:id', authAdmin, sedeActividadController.delete);
