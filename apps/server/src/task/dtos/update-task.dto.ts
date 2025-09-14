import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateSubTaskDto } from 'src/subtask/dtos/update-subtask.dto';
import { Subtask } from 'src/subtask/subtask.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  columnId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubTaskDto)
  subtasks?: UpdateSubTaskDto[];
}
