import { Request, Response, NextFunction } from "express";

export const genericErrorHandel = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500);
    res.json({
        error: err.name,
        message: err.message
    });
}