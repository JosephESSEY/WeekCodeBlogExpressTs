import express, {Application, json, Request, Response} from "express"
import cors from "cors"


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

    }
    
    public listen(PORT : number){
        this.app.listen(PORT, () =>{
            console.log(`Server is runnig on port ${PORT}`)
        })
    }
}