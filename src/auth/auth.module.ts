import { Module, NotFoundException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RtStrategy } from './strategy/rt-strategy';

@Module({
 
  imports:[ JwtModule.register({}),
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'

  }),

  MongooseModule.forFeature([{
    name:User.name,
    schema: userSchema
  }]),
  MongooseModule.forRootAsync({
    //imports: [ConfigService],
    inject: [ConfigService],
    useFactory: async(config: ConfigService) => {
      const connectionString = config.get('CONNECTION_STRING')
      if(!connectionString) {
        throw new NotFoundException("unable to connect to the database!!")
      }
      return ({ uri: connectionString})
    }
  }),

    AuthModule, 
    UserModule, 
    TasksModule
  ],

  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, RtStrategy]
})
export class AuthModule {}
