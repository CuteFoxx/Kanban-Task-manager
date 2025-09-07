import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.taskService.create(data);
  }

  @Get()
  findByColumn(@Query('column') columnId: string) {
    return this.taskService.findByColumn(parseInt(columnId));
  }
}
