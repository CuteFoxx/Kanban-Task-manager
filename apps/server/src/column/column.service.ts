import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { Repository } from 'typeorm';
import { Board } from 'src/board/board.entity';
import { UpdateColumnDto } from './dtos/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column) private columnRepo: Repository<Column>,
  ) {}

  async create(data: CreateColumnDto) {
    const column = this.columnRepo.create(data);

    if (data.boardId) {
      column.board = { id: data.boardId } as Board;
    }

    return await this.columnRepo.save(column);
  }

  async update(data: UpdateColumnDto, id: number) {
    const column = await this.columnRepo.findOneBy({ id });

    if (!column) {
      throw new NotFoundException('column exception');
    }

    Object.assign(column, data);
    return await this.columnRepo.save(column);
  }
}
