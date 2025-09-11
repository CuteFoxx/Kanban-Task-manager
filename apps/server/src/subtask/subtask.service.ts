import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';
import { Repository } from 'typeorm';
import { UpdateSubTaskDto } from './dtos/update-subtask.dto';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask) private subTaskRepo: Repository<Subtask>,
  ) {}

  async update(data: UpdateSubTaskDto, id: number) {
    const subtask = await this.subTaskRepo.findOneBy({ id });

    if (subtask == null) {
      throw new NotFoundException('subtask not found');
    }
    Object.assign(subtask, data);

    return await this.subTaskRepo.save(subtask);
  }
}
