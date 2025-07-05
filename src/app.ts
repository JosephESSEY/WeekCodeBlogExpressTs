import express, {Application, json, Request, Response} from "express"
import cors from "cors"
import pool  from "./shared/database/client";
import { errorHandler } from "./shared/middlewares/error.middleware";
import authRoutes from "./features/auth/auth.route";



export class App{
    public app :Application;

    constructor(){
        this.app = express();
        this.initializeMiddlewares();
         this.initializeError();
        this.initializerRoutes();
    }

    private initializeMiddlewares(){
        this.app.use(cors())
        this.app.use(json())
    }

    private initializeError(){
        this.app.use(errorHandler);
    }

    private initializerRoutes(){

        this.app.get("/", (req : Request, res : Response) => {
            res.json({ status: "ok" });
        });

        this.app.get("/test-db", async (req: Request, res: Response) => {
            const result = await pool.query("SELECT NOW()");
            res.send(result.rows);
        });

        this.app.use("/api/auth", authRoutes);

    }
    
    public listen(PORT : number){
        this.app.listen(PORT, () =>{
            console.log(`Server is runnig on port ${PORT}`)
        })
    }
}