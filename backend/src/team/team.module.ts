import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../entries/team';
import { UserModule } from '../user/user.module';
import { Task } from 'src/entries/task';
import { Resource } from 'src/entries/resource';
import { User } from 'src/entries/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Resource]),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
