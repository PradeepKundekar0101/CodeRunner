class ApiError extends Error{
    statusCode:number;
    success:boolean ;
    constructor(statusCode:number, message:string = "something went wrong"){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this,this.constructor); 
    }
}
export {ApiError};