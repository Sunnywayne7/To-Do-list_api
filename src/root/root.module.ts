import { Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AppModule, AuthModule]
})
export class RootModule {}
