import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dtos/create-board.dto';
import { Column, In, Repository } from 'typeorm';
import { Column as ColumnEntity } from 'src/column/column.entity';
import { ColumnService } from 'src/column/column.service';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepo: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnRepo: Repository<ColumnEntity>,
    private columnService: ColumnService,
  ) {}

  async create(boardDto: CreateBoardDto) {
    const board = this.boardRepo.create(boardDto);
    return await this.boardRepo.save(board);
  }

  async delete(id: number) {
    return this.boardRepo.delete({ id });
  }

  async update(id: number, data: Partial<Board>) {
    const board = await this.boardRepo.findOne({
      where: { id },
      relations: ['columns'],
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    board.name = data.name ?? board.name;

    if (data.columns) {
      const ids = data.columns.map((column) => column.id);
      const toBeCreated = data.columns.filter((column) => column.id == null);

      for (const column of board.columns) {
        const updateData = data.columns?.find((c) => c.id === column.id);
        if (updateData) {
          column.name = updateData.name;
        }
      }

      for (const column of toBeCreated) {
        const newColumn = this.columnRepo.create({
          name: column.name,
          board,
        });
        board.columns.push(this.columnRepo.create(newColumn));
      }

      const toBeDeleted = board.columns.filter((col) => !ids.includes(col.id));

      for (const column of toBeDeleted) {
        board.columns = board.columns.filter((c) => c.id !== column.id);
      }
    }

    return this.boardRepo.save(board);
  }

  async find() {
    return await this.boardRepo.find({
      relations: ['columns'],
    });
  }
}
