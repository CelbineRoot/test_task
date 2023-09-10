import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Имя пользователя',
        type: String,
        required: true,
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Пароль',
        type: String,
        required: true,
    })
    password: string;
}