import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsInt()
  @IsOptional()
  id: number;
  @IsString()
  name: string;
}
