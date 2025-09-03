import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dtos/create-column-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column) private columnRepo: Repository<Column>,
  ) {}

  async create(data: CreateColumnDto) {
    const column = this.columnRepo.create(data);
    return await this.columnRepo.save(column);
  }
}
