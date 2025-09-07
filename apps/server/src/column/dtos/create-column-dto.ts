import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from 'src/task/dtos/create-task.dto';
import { Task } from 'src/task/task.entity';

export class CreateColumnDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  boardId: number;

  @Type(() => CreateTaskDto)
  @IsOptional()
  tasks?: Task[];
}
