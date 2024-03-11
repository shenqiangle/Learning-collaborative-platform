import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entries/user';
import { Team } from './entries/team';
import { Task } from './entries/task';
import { Plan } from './entries/plan';
import { Resource } from './entries/resource';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
import { IndexModule } from './index/index.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zhs@2001829',
      database: 'mydb',
      entities: [User, Team, Task, Plan, Resource],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    TeamModule,
    IndexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
