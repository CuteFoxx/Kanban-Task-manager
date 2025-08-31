import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dtos/create-borad.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(@InjectRepository(Board) private boardRepo: Repository<Board>) {}

  create(boardDto: CreateBoardDto) {
    const board = this.boardRepo.create(boardDto);
    return this.boardRepo.save(board);
  }

  async delete(id: number) {
    const board = await this.boardRepo.findOneBy({ id });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return this.boardRepo.delete(board);
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
    return await this.boardRepo.find();
  }
}
