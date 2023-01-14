export interface Worklab {
    _id:string,
    auther:string,
    name:string,
    participants:[{name:string,id:string}],
    problemId:string,
    createdAt : Date
    

}