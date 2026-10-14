import { model, Schema, Types } from "mongoose";
import { Assignment } from "./assignments.entity";

interface AssignmentDocument extends Omit<Assignment, 'id' | 'createdBy' | 'studentsCount' | 'completedCount' | 'completed'> {
    classroom: Types.ObjectId;
    createdBy: Types.ObjectId;
    completedBy: { student: Types.ObjectId, completedAt: Date }[];
}

const AssignmentSchema = new Schema<AssignmentDocument>({
    title: String,
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    completedBy: [{
        student: { type: Schema.Types.ObjectId, ref: 'User' },
        completedAt: { type: Date }
    }],
    createdAt: { type: Date, default: Date.now }
});

AssignmentSchema.virtual('completedCount').get(function () {
    return this.completedBy.length;
});

AssignmentSchema.virtual('studentsCount').get(function () {
    const classroom = this.classroom as any;
    return classroom?.students?.length ?? 0;
});

AssignmentSchema.virtual('completed').get(function () {
    const studentsCount = (this as any).studentsCount;
    return studentsCount > 0 && this.completedBy.length >= studentsCount;
});

const transform = (_: any, ret: any) => ({
    id: ret.id,
    title: ret.title,
    studentsCount: ret.studentsCount,
    completedCount: ret.completedCount,
    completed: ret.completed,
    createdAt: ret.createdAt,
    createdBy: ret.createdBy
});

AssignmentSchema.set('toJSON', { virtuals: true, transform });
AssignmentSchema.set('toObject', { virtuals: true, transform });

export const AssignmentModel = model<AssignmentDocument>('Assignment', AssignmentSchema);