import {ApiProperty} from "@nestjs/swagger";

class SignUpResponse {
    @ApiProperty({
        description: 'Идентификатор сущности',
        required: true,
        type: String,
    })
    id: string;

    @ApiProperty({
        description: 'JWT токен',
        required: true,
        type: String,
    })
    token: string;
}

export const SignUpDocsSuccess = {
    status: 200,
    type: SignUpResponse
}