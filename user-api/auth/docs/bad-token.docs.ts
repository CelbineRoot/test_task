import {ApiProperty} from "@nestjs/swagger";

class BadTokenResponse {
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
        default: 'Bad token',
        type: String,
    })
    error_message: string;
}


export const BadTokenDocs = {
    status: 403,
    type: BadTokenResponse
}