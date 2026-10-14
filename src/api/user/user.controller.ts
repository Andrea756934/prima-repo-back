import { NextFunction, Request, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import userService from "./user.service";
import { Role } from "./user.entity";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
}

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const role = req.query.role as Role | undefined;
    let results = await userService.find(role);
    res.json(results);
  }
  catch (err) {
    next(err);
  }
}