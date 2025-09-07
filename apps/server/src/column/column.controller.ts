import { Body, Controller, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dtos/create-column-dto';

@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  create(@Body() data: CreateColumnDto) {
    return this.columnService.create(data);
  }
}
