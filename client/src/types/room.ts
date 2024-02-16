export interface IRoom {
    _id:string;
    name: string;
    password: string;
    author: string;
    participants:{name:string,id:string}[]
    sandbox: string;
  }