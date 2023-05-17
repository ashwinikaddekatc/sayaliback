import { Role } from "./role";
export class Regis {
    public createdAt: Date;
    public updatedAt: Date;
    public createdBy: string;
    public updatedBy: string; 
    public userId: string;
    public firstName: string; 
    public lastName: string; 
    public fullName: string; 
    public email: string; 
    public username:string; 
    public menu_group_id: number
    public status: string; 
    public department: string; 
    public about:string; 
    public photos: string; 
    public role: string;
    public checknumber: number;
    public provider: string; 
    public  roles: Role[];

}