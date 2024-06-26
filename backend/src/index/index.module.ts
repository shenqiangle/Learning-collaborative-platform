import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { TeamModule } from 'src/team/team.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from 'src/entries/team';
import { User } from 'src/entries/user';
import { Act } from 'src/entries/act';

@Module({
  imports: [
    TeamModule,
    UserModule,
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Act]),
  ],
  controllers: [IndexController],
  providers: [IndexService],
  exports: [IndexService],
})
export class IndexModule {}
