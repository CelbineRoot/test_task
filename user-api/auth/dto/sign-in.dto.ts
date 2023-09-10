import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Id пользователя',
        type: String,
        required: true,
    })
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Пароль',
        type: String,
        required: true,
    })
    password: string;
}