import {ApiProperty} from "@nestjs/swagger";

class SignInResponseSuccess {
    @ApiProperty({
        description: 'JWT токен',
        required: true,
        type: String,
    })
    token: string;
}

class SignInResponseError {
    @ApiProperty({
        description: 'Код-статус http ошибки',
        required: true,
        default: 401,
        type: Number,
    })
    status: number;

    @ApiProperty({
        description: 'Сообщение ошибки',
        required: true,
        default: 'Bad id or password',
        type: String,
    })
    error_message: string;
}

export const SignInResponseSuccessDoc = {
    status: 200,
    description: 'Успешный ответ',
    type: SignInResponseSuccess
}

export const SignInResponseBadRequestDoc = {
    status: 401,
    description: 'Ошибка',
    type: SignInResponseError
}