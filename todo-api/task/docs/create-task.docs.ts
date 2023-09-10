import {ApiProperty} from "@nestjs/swagger";

class CreateTaskResponseSuccess {
    @ApiProperty({
        description: 'Идентификатор сущности',
        required: true,
        type: String,
    })
    id: string;
}

export const CreateTaskResponseSuccessDoc = {
    status: 200,
    description: 'Успешный ответ',
    type: CreateTaskResponseSuccess
}