import { CategorieService } from "./categories.service";
import { Request, Response } from "express";

export class CategorieController{
    private categorieService : CategorieService;

    constructor(){
        this.categorieService = new CategorieService();
    }

    public createCategorie = async (req: Request, res: Response) => {
        try {
            const { name } = req.body
            const newCategorie = await this.categorieService.createCategorie(name);
            res.status(201).json({
                success: true,
                message: "Categorie Created Successfuly",
                data: newCategorie
            })
        } catch (error : any) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message || "Server Error"
            })
        }
    }
    
    public updateCategorie = async(req: Request, res: Response) => {
        try {
            const {id, name} = req.body;
            const updated = await this.categorieService.updateCategorie(id, name);
            res.status(201).json({
                success: true,
                message: "Categorie updated successfuly",
                data: updated
            })
            
        } catch (error: any) {
            res.status(error.statusCode || 500).json({
                success: false,
                error: error.message || "Server Error"
            })
        }
    }

    public DeleteCategorie = async (req: Request, res: Response) => {
        try {
            const {id} = req.body;
            const deleted = await this.categorieService.deleteCategorie(id);
            res.status(203).json({
                success: true,
                message: "Categorie Deleted Successfuly",
                data: deleted
            }) 
        } catch (error: any) {
            res.status(error.statusCode || 500).json({
                success: false,
                error: error.message || "Server Error"
            })
        }
    }
    
    public ListeCategorie = async (req: Request, res: Response) => {
        try {
            const categories = await this.categorieService.allCategorie();
            res.status(200).json({
                success: true,
                message: "Categories Retrieved successfuly",
                data: categories,
                count: categories?.length
            })
        } catch (error: any) {
            res.status(error.statusCode || 500).json({
                success: false,
                error: error.message || "Server Error"
            })
        }
    }
}