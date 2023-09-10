import {Controller, Get, Post, Delete, Param, Body, UseGuards, Request, HttpCode} from '@nestjs/common';
import { Task } from './task.model';
import {TaskService} from "./task.service";
import {CreateTaskDto} from "./dto/create-task.dto";
import {JwtGuard} from "../auth/jwt.guard";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTaskResponseSuccessDoc} from "./docs/create-task.docs";
import {
    DeleteTaskResponseForbiddenDoc,
    DeleteTaskResponseNotFoundDoc,
    DeleteTaskResponseSuccessDoc
} from "./docs/delete-task.docs";
import {BadTokenDocs} from "../auth/docs/bad-token.docs";
import {GetAllTasksResponseSuccessDoc} from "./docs/get-all-tasks.docs";

@ApiTags('TASK')
@Controller('task')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class TaskController {
    constructor(private taskService: TaskService) {}

    @HttpCode(200)
    @ApiOperation({ summary: 'Создание задачи' })
    @ApiResponse(CreateTaskResponseSuccessDoc)
    @ApiResponse(BadTokenDocs)
    @Post()
    async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(dto);
    }

    @HttpCode(200)
    @ApiOperation({ summary: 'Получить все свои задачи' })
    @ApiResponse(GetAllTasksResponseSuccessDoc)
    @ApiResponse(BadTokenDocs)
    @Get()
    async getAllTasks(@Request() req): Promise<Task[]> {
        return this.taskService.getAllTasksByOwner();
    }

    @HttpCode(200)
    @ApiOperation({ summary: 'Удаление своей задачи' })
    @ApiResponse(DeleteTaskResponseSuccessDoc)
    @ApiResponse(DeleteTaskResponseNotFoundDoc)
    @ApiResponse(DeleteTaskResponseForbiddenDoc)
    @ApiResponse(BadTokenDocs)
    @Delete(':id')
    async deleteTask(@Param('id') id: string, @Request() req): Promise<{id: string} | null> {
        return this.taskService.deleteTask(id);
    }
}