import { Body, Controller, Param, Patch } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { UpdateSubTaskDto } from './dtos/update-subtask.dto';

@Controller('subtask')
export class SubtaskController {
  constructor(private subTaskService: SubtaskService) {}

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateSubTaskDto) {
    return await this.subTaskService.update(data, parseInt(id));
  }
}
