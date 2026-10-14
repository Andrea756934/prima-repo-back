import { ClassroomModel } from "./classroom.model";
import { Classroom } from "./classroom.entity";

export class ClassroomService {
    async add(
        data: { name: string, students: string[] },
        createdBy: string): Promise<Classroom> {
        const classroom = await ClassroomModel.create({
            name: data.name,
            students: data.students,
            createdBy
        });

        await classroom.populate('createdBy');
        return classroom.toObject() as unknown as Classroom;
    }

    async find(userId: string, role: 'student' | 'teacher'): Promise<Classroom[]> {
        const filter = role === 'teacher'
            ? { createdBy: userId }
            : { students: userId };

        const classroom = await ClassroomModel.find(filter).populate('createdBy');
        return classroom.map(classroom => classroom.toObject()) as unknown as Classroom[];
    }
}
export default new ClassroomService();  