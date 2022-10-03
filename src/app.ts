import express, {Application} from "express";
var cors = require('cors')

const app: Application = express();

//Rutas
import studentRoutes from './routers/Student'
import teacherRoutes from './routers/Teacher';
import auth from './routers/Auth';
import workshop from './routers/Workshop';

//cors
app.use(cors());
//Settings
app.set('port', process.env.PORT);

//middleware
app.use(express.json());

const apiVersion = 'api-v1'

//Routes

app.use(`/${apiVersion}/student`,studentRoutes);

app.use(`/${apiVersion}/teacher`,teacherRoutes);

app.use(`/${apiVersion}/signin`, auth);

app.use(`/${apiVersion}/workshop`, workshop);


export default app;