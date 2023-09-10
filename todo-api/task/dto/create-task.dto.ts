import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Заголовок задачи',
        type: String,
        required: true,
    })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Описание задачи',
        type: String,
        required: true,
    })
    description: string;
}