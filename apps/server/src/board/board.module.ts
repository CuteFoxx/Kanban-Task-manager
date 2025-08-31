import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
