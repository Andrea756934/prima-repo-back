import { NextFunction, Response } from "express";
import { TypedRequest } from "../../../lib/typed-request.interface";
import { createAssignmentDto } from "./assignments.dto";
import assignmentSrv from "./assignments.service";
import { WrongRoleError } from "../../../errors/wrong-role.error";

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
        const classroom = req.params.classroomId as string;
        let results = await assignmentSrv.find(classroom, req.user!.id, req.user!.role);
        res.json(results);
    }
    catch (err) {
        next(err);
    }
}

export const create = async (req: TypedRequest<createAssignmentDto>, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== 'teacher') {
            throw new WrongRoleError();
        }

        const classroomId = req.params.classroomId as string;
        const assignment = await assignmentSrv.add(classroomId, req.body, req.user!.id);
        res.json(assignment);
    }
    catch (err) {
        next(err);
    }
}

export const completed = async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role !== 'student') {
            throw new WrongRoleError();
        }

        const classroomId = req.params.classroomId as string;
        const id = req.params.id as string;
        const assignment = await assignmentSrv.completed(classroomId, id, req.user!.id);
        res.json(assignment);
    }
    catch (err) {
        next(err);
    }
}