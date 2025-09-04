import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dtos/create-board.dto';
import { Repository } from 'typeorm';
import { Column as BoardColumn } from 'src/column/column.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepo: Repository<Board>,
    @InjectRepository(BoardColumn) private columnRepo: Repository<BoardColumn>,
  ) {}

  async create(boardDto: CreateBoardDto) {
    const board = this.boardRepo.create(boardDto);
    return await this.boardRepo.save(board);
  }

  async delete(id: number) {
    return this.boardRepo.delete({ id });
  }

  async update(id: number, data: Partial<Board>) {
    const board = await this.boardRepo.findOneBy({ id });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    Object.assign(board, data);
    return this.boardRepo.save(board);
  }

  async find() {
    return await this.boardRepo.find({
      relations: ['columns'],
    });
  }
}
