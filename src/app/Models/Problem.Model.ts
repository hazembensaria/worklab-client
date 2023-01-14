export interface Problem {
    description:string; 
    name:string;
    difficulty:string;
    _id:string,
    category:string,
    comments:{authorId:string,comment:string}[] | null;
}