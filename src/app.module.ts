import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports:[
    UserModule, 
    TasksModule
  ]
})
export class AppModule {}
