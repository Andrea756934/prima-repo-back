import { NextFunction, Request, Response } from "express";

export class WrongRoleError extends Error {
  constructor() {
    super();
    this.name = 'Wrong Role';
    this.message = 'User not authorized for this operation';
  }
}

export const wrongRoleHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof WrongRoleError) {
    res.status(401);
    res.json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
}