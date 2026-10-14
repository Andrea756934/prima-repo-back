import { AssignmentModel } from "./assignments.model";
import { Assignment } from "./assignments.entity";
import { ClassroomModel } from "../classroom.model";
import { NotFoundError } from "../../../errors/not-found.error";
import { AlreadyCompletedError } from "../../../errors/already-completed.error";
import { userModel } from "../../user/user.model";
import { User } from "../../user/user.entity";

export class AssignmentService {
    async find(
        classroomId: string,
        userId: string,
        role: 'student' | 'teacher'): Promise<Assignment[]> {
        const filter = role === 'teacher'
            ? { _id: classroomId, createdBy: userId }
            : { _id: classroomId, students: userId };

        const classroom = await ClassroomModel.findOne(filter);
        if (!classroom) {
            throw new NotFoundError();
        }

        const assignments = await AssignmentModel.find({ classroom: classroomId }).populate(['createdBy', 'classroom']);

        const students = role === 'teacher'
            ? await userModel.find({ _id: { $in: classroom.students } }) : [];

        return assignments.map(assignment => {
            const response = this.AssignmentResponse(assignment, classroom.students.length, userId);
            if (role === 'teacher') {
                response.students = students.map(student => {
                    const complete = assignment.completedBy.find(completed => completed.student.toString() === student.id);
                    return {
                        user: student.toObject() as unknown as User,
                        completed: !!complete,
                        completedAt: complete?.completedAt ?? null
                    };
                });
            }
            return response;
        });
    }

    async add(
        classroomId: string,
        data: { title: string },
        createdBy: string): Promise<Assignment> {
        const classroom = await ClassroomModel.findOne({ _id: classroomId, createdBy });
        if (!classroom) {
            throw new NotFoundError();
        }

        const assignment = await AssignmentModel.create({
            title: data.title,
            classroom: classroomId,
            createdBy
        });

        await assignment.populate(['createdBy', 'classroom']);
        return this.AssignmentResponse(assignment, classroom.students.length, createdBy);
    }


    async completed(
        classroomId: string,
        assignmentId: string,
        studentId: string): Promise<Assignment> {
        const classroom = await ClassroomModel.findOne({ _id: classroomId, students: studentId });
        if (!classroom) {
            throw new NotFoundError();
        }

        const assignment = await AssignmentModel.findOne({ _id: assignmentId, classroom: classroomId });
        if (!assignment) {
            throw new NotFoundError();
        }

        const alreadyCompleted = assignment.completedBy.some(complete => complete.student.toString() === studentId);
        if (alreadyCompleted) {
            throw new AlreadyCompletedError();
        }

        assignment.completedBy.push({ student: studentId as any, completedAt: new Date() });
        await assignment.save();

        return this.AssignmentResponse(assignment, classroom.students.length, studentId);
    }

    private AssignmentResponse(assignment: any, studentsCount: number, userId: string): Assignment {
        const object = assignment.toObject();
        return {
            ...object,
            studentsCount,
            completed: assignment.completedBy.some((complete: any) => complete.student.toString() === userId)
        } as Assignment;
    }
}

export default new AssignmentService();