import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";

@Schema({
    strict: true
})
export class Tasks{
    @Prop({required: true, unique: true})
    title: string;

    @Prop()
    description: string;

    @Prop({default: false})
    completed: boolean;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({default: Date})
    updatedAt: Date;

    @Prop({type: Date}) 
    dueDate: Date;

    @Prop({ type: String, enum:['low', 'medium', 'high'] })
    priority: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assignedTo: User;

    @Prop({ type: String, default: 'todo',  enum:['todo', 'inProgress', 'done'], index: true })
    status: string;
}

export const tasksSchema = SchemaFactory.createForClass(Tasks);