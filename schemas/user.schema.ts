import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";

@Schema()
export class User {
    @Prop({ required: true, unique: true})
    userName: string;
    
    @Prop({ required: true, unique: true})
    email: string;

    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop()
    hash: string;

    @Prop({type: Date, default: Date.now})
    createdAt: Date;

    @Prop({type: Date, default: Date.now})
    updatedAt: Date;
    
    @Prop()
    role: string;

    @Prop()
    hashedRt: string;

}

export const userSchema = SchemaFactory.createForClass(User);