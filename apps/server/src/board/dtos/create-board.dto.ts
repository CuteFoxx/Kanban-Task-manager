import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { CreateColumnDto } from 'src/column/dtos/create-column-dto';

export class CreateBoardDto {
  @IsString()
  name: string;

  @Type(() => CreateColumnDto)
  @IsOptional()
  columns?: CreateColumnDto[];
}
