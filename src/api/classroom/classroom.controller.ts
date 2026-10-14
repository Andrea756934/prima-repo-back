import { NextFunction, Response } from "express";
import { TypedRequest } from "../../lib/typed-request.interface";
import { createClassroomDto } from "./classroom.dto";
import classroomSrv from "./classroom.service";
import { WrongRoleError } from "../../errors/wrong-role.error";

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    let results = await classroomSrv.find(req.user!.id, req.user!.role);
    res.json(results);
  }
  catch (err) {
    next(err);
  }
}

export const create = async (req: TypedRequest<createClassroomDto>, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== 'teacher') {
      throw new WrongRoleError();
    }

    let classroom = await classroomSrv.add(req.body, req.user!.id);
    res.json(classroom);
  }
  catch (err) {
    next(err);
  }
}