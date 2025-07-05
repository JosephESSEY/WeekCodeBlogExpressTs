import express, {Application, json, Request, Response} from "express"
import cors from "cors"
import pool  from "./shared/database/client";



export class App{
    public app :Application;

    constructor(){
        this.app = express();
        this.initializeMiddlewares();
        this.initializerRoutes();
    }

    private initializeMiddlewares(){
        this.app.use(cors())
        this.app.use(json())
    }

    private initializerRoutes(){

        this.app.get("/", (req : Request, res : Response) => {
            res.json({ status: "ok" });
        });

        this.app.get("/test-db", async (req: Request, res: Response) => {
            const result = await pool.query("SELECT NOW()");
            res.send(result.rows);
        });

    }
    
    public listen(PORT : number){
        this.app.listen(PORT, () =>{
            console.log(`Server is runnig on port ${PORT}`)
        })
    }
}