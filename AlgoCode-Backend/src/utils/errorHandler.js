import BaseError from '../errors/base.error.js';
import { StatusCodes } from 'http-status-codes';


export function  errorHandler(err, req, res, next) {
    console.log("Error Handler")
    if(err instanceof BaseError) {
        return res.status(err.statusCode).json({
            success:false,
            message: err.message,
            error:err.details,
            data:{}
        })
    }


    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:"Something went wrong",
        error:err,
        data:{}
    });

}





