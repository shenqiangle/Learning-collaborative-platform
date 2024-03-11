import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entries/user';
import { Plan } from 'src/entries/plan';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Plan])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
