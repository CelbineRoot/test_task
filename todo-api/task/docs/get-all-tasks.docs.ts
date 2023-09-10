import {ApiProperty} from "@nestjs/swagger";

class Task {
    @ApiProperty({
        description: 'Идентификатор сущности',
        required: true,
        type: String,
    })
    id: string;

    @ApiProperty({
        description: 'Заголовок задачи',
        required: true,
        type: String,
    })
    title: string;

    @ApiProperty({
        description: 'Описание задачи',
        required: true,
        type: String,
    })
    description: string;
}

export const GetAllTasksResponseSuccessDoc = {
    status: 200,
    description: 'Успешный ответ',
    isArray: true,
    type: Task
}