import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreateSubtaskDto } from 'src/subtask/create-subtask.dto';
import { Subtask } from 'src/subtask/subtask.entity';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  columnId: number;

  @Type(() => CreateSubtaskDto)
  @IsOptional()
  subtasks?: Subtask[];
}
