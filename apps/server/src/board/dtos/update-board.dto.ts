import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Column } from 'src/column/column.entity';
import { UpdateColumnDto } from 'src/column/dtos/update-column.dto';

export class UpdateBoardDto {
  @IsString()
  @IsOptional()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateColumnDto)
  @IsOptional()
  columns: Column[];
}
