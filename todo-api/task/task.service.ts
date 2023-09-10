import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { Task } from './task.model';
import {TaskRepository} from "./task.repository";
import {ContextService} from "../context/context.service";
import {CreateTaskDto} from "./dto/create-task.dto";

@Injectable()
export class TaskService {
    constructor(
        private taskRepository: TaskRepository,
        private contextService: ContextService,
    ) {}

    createTask({title, description}: CreateTaskDto): Promise<Task> {
        const ownerId = this.contextService.user.id;
        return this.taskRepository.createTask(title, description, ownerId);
    }

    getAllTasksByOwner(): Promise<Task[]> {
        const ownerId = this.contextService.user.id;
        return this.taskRepository.getAllTasksByOwner(ownerId);
    }

    async deleteTask(id: string): Promise<{id: string} | null> {
        const task = await this.taskRepository.findById(id);
        const ownerId = this.contextService.user.id;

        if(!task) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error_message: 'Task is not found',
            }, HttpStatus.NOT_FOUND);
        }

        if(task.owner !== ownerId) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error_message: 'Is not an owner',
            }, HttpStatus.FORBIDDEN);
        }

        const deletedEntity = await this.taskRepository.deleteTask(id, ownerId);

        return {id: deletedEntity.id}
    }
}