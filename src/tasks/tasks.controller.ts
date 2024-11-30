import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Type, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/tasks.dto';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from 'schemas/tasks.schema';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Post('createtask')
    createTask(@GetUser('id') userId: string, @Body() dto: CreateTasksDto) {
        return this.taskService.createTask(userId, dto);
    }
    
    @Get('getTasks')
    getTasks(@GetUser('id') userId: string) {
        return this.taskService.getTasks(userId);
    }

    @Get(':id')
    getTasksById(@GetUser('id') userId: string, @Param('id') id: string) {
        return this.taskService.getTasksById(userId, id);
    }

    @Get()
    getTasksByStatus(@Query('status') status: string): Promise<Tasks[]> {
        return this.taskService.getTasksByStatus( status)
    }

    @Patch(':id')
    patchTasksById(@GetUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.taskService.patchTasksById(userId, id, dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTaskById(@GetUser('id') userId: string, @Param('id') id: string) {
        return this.taskService.deleteTaskById(userId, id)
    }

}
