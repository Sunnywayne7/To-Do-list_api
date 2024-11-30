import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Date } from "mongoose"

export class CreateTasksDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsNotEmpty()
    dueDate: Date;

    @IsString()
    @IsNotEmpty()
    priority: string;
    
    @IsString()
    @IsOptional()
    status?: string;


}