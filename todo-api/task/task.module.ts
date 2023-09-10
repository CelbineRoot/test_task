import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.model';
import {TaskService} from "./task.service";
import {TaskController} from "./task.controller";
import {ContextModule} from "../context/context.module";
import {LoggerModule} from "../modules/logger/logger.module";
import {TaskRepository} from "./task.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
        ContextModule,
        LoggerModule
    ],
    controllers: [TaskController],
    providers: [TaskService, TaskRepository],
})
export class TasksModule {}