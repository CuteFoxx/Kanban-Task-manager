import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSubTaskDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}
