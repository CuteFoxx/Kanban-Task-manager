import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from 'src/column/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Column])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
