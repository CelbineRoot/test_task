import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TaskRepository {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

    createTask(title: string, description: string, owner: string): Promise<Task> {
        const task = new this.taskModel({ title, description, owner });
        return task.save();
    }

    getAllTasksByOwner(owner: string): Promise<Task[]> {
        return this.taskModel.find({ owner }).exec();
    }

    findById(id: string): Promise<Task> {
        return this.taskModel.findById(id).exec();
    }

    deleteTask(id: string, owner: string): Promise<Task | null> {
        return this.taskModel.findOneAndDelete({ _id: id, owner }).exec();
    }
}