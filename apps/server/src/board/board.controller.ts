import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardService } from './board.service';
import { UpdateBoardDto } from './dtos/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async findAll() {
    return await this.boardService.find();
  }

  @Post()
  async create(@Body() data: CreateBoardDto) {
    return await this.boardService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateBoardDto) {
    return await this.boardService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.boardService.delete(+id);
  }
}
