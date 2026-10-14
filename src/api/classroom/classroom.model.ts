import { model, Schema, Types } from "mongoose";
import { Classroom } from "./classroom.entity";

interface ClassroomDocument extends Omit<Classroom, 'id' | 'createdBy' | 'studentsCount'> {
  students: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

const ClassroomSchema = new Schema<ClassroomDocument>({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

ClassroomSchema.virtual('studentsCount').get(function () {
  return this.students.length;
});

const transform = (_: any, ret: any) => ({
  id: ret.id,
  name: ret.name,
  studentsCount: ret.studentsCount,
  createdBy: ret.createdBy,
});

ClassroomSchema.set('toJSON', { virtuals: true, transform });
ClassroomSchema.set('toObject', { virtuals: true, transform });

export const ClassroomModel = model<ClassroomDocument>('Classroom', ClassroomSchema);