import {ApiProperty} from "@nestjs/swagger";

class DeleteTaskResponseSuccess {
    @ApiProperty({
        description: 'Идентификатор удаленной сущности',
        required: true,
        type: String,
    })
    id: string;
}

class DeleteTaskResponseNotFound {
    @ApiProperty({
        description: 'Код-статус http ошибки',
        required: true,
        default: 404,
        type: Number,
    })
    status: number;

    @ApiProperty({
        description: 'Сообщение ошибки',
        required: true,
        default: 'Task is not found',
        type: String,
    })
    error_message: string;
}

class DeleteTaskResponseForbidden {
    @ApiProperty({
        description: 'Код-статус http ошибки',
        required: true,
        default: 403,
        type: Number,
    })
    status: number;

    @ApiProperty({
        description: 'Сообщение ошибки',
        required: true,
        default: 'Is not an owner',
        type: String,
    })
    error_message: string;
}

export const DeleteTaskResponseSuccessDoc = {
    status: 200,
    description: 'Успешный ответ',
    type: DeleteTaskResponseSuccess
}

export const DeleteTaskResponseNotFoundDoc = {
    status: 404,
    description: 'Не найдена таска',
    type: DeleteTaskResponseNotFound
}

export const DeleteTaskResponseForbiddenDoc = {
    status: 403,
    description: 'Нет доступа',
    type: DeleteTaskResponseForbidden
}