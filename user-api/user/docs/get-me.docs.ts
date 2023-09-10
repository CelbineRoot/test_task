import {ApiProperty} from "@nestjs/swagger";

class GetMeResponse {
    @ApiProperty({
        description: 'Идентификатор сущности',
        required: true,
        type: String,
    })
    id: string;

    @ApiProperty({
        description: 'Логин пользователя',
        required: true,
        type: String,
    })
    username: string;
}

export const GetMeDocsSuccess = {
    status: 200,
    type: GetMeResponse
}