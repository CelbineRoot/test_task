import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Task extends Document {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User' }) // Ссылка на владельца задачи
    owner: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);