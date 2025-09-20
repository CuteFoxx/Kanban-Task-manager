import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TaskDto } from './dtos/task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  @Serialize(TaskDto)
  async create(@Body() data: CreateTaskDto) {
    return await this.taskService.create(data);
  }

  @Get(':id')
  @Serialize(TaskDto)
  async get(@Param('id') id: string) {
    return await this.taskService.findOne(parseInt(id));
  }

  @Get()
  @Serialize(TaskDto)
  async find(
    @Query('column') columnId?: string,
    @Query('board') boardId?: string,
  ) {
    if (columnId) {
      return await this.taskService.findByColumn(parseInt(columnId));
    }
    if (boardId) {
      return await this.taskService.findByBoard(parseInt(boardId));
    }
    throw new BadRequestException('Either column or board must be provided');
  }

  @Patch(':id')
  @Serialize(TaskDto)
  async update(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return await this.taskService.update(data, parseInt(id));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.taskService.delete(parseInt(id));
  }
}
