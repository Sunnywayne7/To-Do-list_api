import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTasksDto } from './dto/tasks.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks } from 'schemas/tasks.schema';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel (Tasks.name) private taskmodel: Model<Tasks>) {}

    async createTask(userId: string, dto: CreateTasksDto) {
        const task = await this.taskmodel.create({
            assignedTo: userId,
            ...dto
        })
        return task;
    }

    async getTasks(userId: string) {
        const tasks = await this.taskmodel.find({assignedTo: userId});
        if(!tasks) {
            throw new NotFoundException("This user has no tasks yet....kindly create a new task!!");
        }
        return tasks;
    }


    async getTasksById(userId: string, id: string) {

      const getTask = await this.taskmodel.findOne({ _id: id,  assignedTo: userId });
      if (!getTask) {
          throw new NotFoundException("Task not found!!");
      }
      console.log(getTask.status)
      
      return getTask;
   }

async getTasksByStatus(status: string) {
    if(!status) {
        throw new ForbiddenException('Invalid query!!')
    }

    const query = { status }
    const tasks = await this.taskmodel.find(query).exec()
    if(tasks.length === 0) {
        throw new NotFoundException(`no task found with status '${status}'`)
    }
    return tasks;
}


async patchTasksById(userId: string, id: string, dto: UpdateTaskDto) {
  const updateTask = await this.taskmodel.findOne({ _id: id, assignedTo: userId })
  if (!updateTask) {
          throw new UnauthorizedException('you do not have access to modify this document!!');
        }    
  
    const updated = await this.taskmodel.findByIdAndUpdate(
        id, 
        { $set: {
            ...dto,
          completed: dto.status === 'done'? true : false 
        }
    }, 
        { new: true, runValidators: true });
        //runValidators is used to enforce the enum validations from the database schema....e.g status, priority...
        return updated;

 
}

async deleteTaskById(userId: string, id: string) {
    const deletedTask = await this.taskmodel.findOneAndDelete({ _id: id, assignedTo: userId })
    if(!deletedTask) {
        throw new NotFoundException("task not found!!")
    }
    return;
}
}
