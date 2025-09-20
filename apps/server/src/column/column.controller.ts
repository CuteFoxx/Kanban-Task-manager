import { Body, Controller, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dtos/create-column-dto';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  async create(@Body() data: CreateColumnDto) {
    return await this.columnService.create(data);
  }
}
