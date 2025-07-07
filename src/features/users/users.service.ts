import {UserRepository} from "./users.repository";
import { User } from "./users.model";


export class UserService{
    private userRepository : UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    public async getAllVisitor() : Promise<User[] | null>{
        const visitors = await this.userRepository.getAllVisitors();

        if(!visitors || visitors?.length < 1) throw ({statusCode : 404, message : "No visitors found"});

        return visitors;
    }

    public async getVisitorById(id: string): Promise<User | null>{
        const visitor = await this.userRepository.getVisitorById(id);
        if(!visitor) throw ({statusCode : 404, message: "No Visitor found"});
        return visitor;
    }

    public async updateAccount(id: string, name: string): Promise<User | null>{
       const updated = await this.userRepository.updateAccount(id, name);
       return updated;
    }
}