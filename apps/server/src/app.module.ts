import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';
import { ColumnModule } from './column/column.module';
import { Column } from './column/column.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { SubtaskModule } from './subtask/subtask.module';
import { Subtask } from './subtask/subtask.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Board, Column, Task, Subtask],
      synchronize: true,
    }),
    BoardModule,
    ColumnModule,
    TaskModule,
    SubtaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
