import express, {Request, Response, NextFunction } from 'express';
import cors from "cors";
import * as path from "path";
let app: express.Application | undefined = undefined;
const PORT = 8080;

app = express();

//Routers to be imported
import userRouter from "./routes/userRouter";
import k8Router from "./routes/k8Router";


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
}));

app.use('/user', userRouter);
app.use('/k8', k8Router);

// psql -d postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq -f databaseTable.sql

//Catch all error handler
app.use((req,res)=>{
    return res.status(404).send('You in the wrong place')
});

//Global Error handler
app.use((err: Error, req: Request, res: Response) => {
    // This will define an interface here to determine the element types of keys
    interface globalError {
        log: string,
        status: number,
        [key: string]:any
    }

    const defaultErr:globalError = {
        log: 'Express error handler caught unkown middleware error',
        status: 500,
        message: {err: 'An error occured'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT} `);
});

export default app;