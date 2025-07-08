import { Categories } from "./categories.model";
import { CategoriesRepository } from "./categories.repository";

export class CategorieService{
    private categorieService : CategoriesRepository;

    constructor(){
        this.categorieService = new CategoriesRepository();
    }

    public async createCategorie(name: string): Promise<Categories>{
        const newCategorie = await this.categorieService.createCategorie(name);
        return newCategorie;
    }

    public async allCategorie(): Promise<Categories[] | null>{
        const categories = await this.categorieService.allCategories();
        if(!categories) throw({statusCode: 400, message: "Bad Request"});
        return categories;
    }

    public async updateCategorie(id: string, name: string): Promise<Categories>{
        const existingCategorie = await this.categorieService.findCategorieById(id);
        if(!existingCategorie) throw({statusCode: 404, message: "Categorie not found"});
        const updated = await this.categorieService.updateCategorie(id, name);
        return updated;
    }
    public async deleteCategorie(id: string): Promise<Categories>{
        const existingCategorie = await this.categorieService.findCategorieById(id);
        if(!existingCategorie) throw({statusCode: 404, message: "Categorie not found"});
        const deleted = await this.categorieService.deleteCategorie(id);
        return deleted;
    }
}