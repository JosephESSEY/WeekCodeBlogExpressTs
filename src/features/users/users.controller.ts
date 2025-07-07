import {UserService} from "./users.service";
import {Request, Response, NextFunction} from "express"
import { DecodedToken } from "../../types/auth";


export class UserController{
    private userService: UserService;

    constructor(){
        this.userService = new UserService();
    }

    public getAllVisitors = async(req: Request, res: Response, next: NextFunction) => {

        try {
            const visitors = await this.userService.getAllVisitor();
            res.status(200).json({
                success: true,
                message : "Liste des Visiteurs",
                data : visitors,
                count: visitors?.length
            })
        } catch (error : any) {
            res.status(error.statusCode || 500).json({
                message : error.message || "Server Error"
            })
        }
    }

    public getVisitorById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user as DecodedToken;

            const id = user.id;
            const visitor = await this.userService.getVisitorById(id);
            res.status(200).json({
                success: true,
                message: "Profil",
                data: visitor
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).json({
                error : error.message || "Server Error"
            })
        }
    }

    public updateAccount = async (req: Request, res: Response) => {
        try {
            const user = (req as any ).user as DecodedToken;
            const id = user.id;
            const { name } = req.body;

            const updated = await this.userService.updateAccount(id, name);
            res.status(201).json({
                success: true,
                message: "Account updated Successfuly",
                data: updated
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).json({
                error: error.message
            })
        }
    }
}