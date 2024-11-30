import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator"

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsDate()
    @Transform(({value}) => new Date(value), { toClassOnly: true })
    @IsOptional()
    dueDate? : Date;

    @IsString()
    @IsOptional()
    @IsEnum(['low', 'medium', 'high'], {
        message: "priority must be one of 'low', 'medium', 'high'"
    })
    priority: string;

    @IsString()
    @IsOptional()
    @IsEnum(['todo', 'inProgress', 'done'], {
        message: "status must be one of 'todo', 'inProgress', 'done'"
    })
    status: string;
}