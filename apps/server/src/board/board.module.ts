import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { ColumnService } from 'src/column/column.service';
import { Column } from 'src/column/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Column])],
  controllers: [BoardController],
  providers: [BoardService, ColumnService],
})
export class BoardModule {}
