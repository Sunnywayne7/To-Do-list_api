import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Tasks, tasksSchema } from 'schemas/tasks.schema';

@Module({imports: [
  MongooseModule.forFeature([{
    schema: tasksSchema,
    name: Tasks.name
  }])
],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
