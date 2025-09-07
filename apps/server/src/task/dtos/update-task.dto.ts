import { IsInt, IsOptional, IsString } from 'class-validator';

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
}
