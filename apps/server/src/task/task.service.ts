import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Column } from 'src/column/column.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Column) private columnRepo: Repository<Column>,
  ) {}

  async create(data: CreateTaskDto) {
    const task = this.taskRepo.create(data);
    const column = await this.columnRepo.findOneBy({ id: data.columnId });
    if (!column) {
      throw new NotFoundException('column not found');
    }
    task.column = column;
    return await this.taskRepo.save(task);
  }

  async findByColumn(columnId: number) {
    if (columnId == null) {
      throw new BadRequestException('column id cannot be empty');
    }
    return await this.taskRepo.find({
      where: { column: { id: columnId } },
      relations: {
        column: true,
      },
    });
  }
}
