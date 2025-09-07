import { Expose, Transform } from 'class-transformer';
import { Column } from 'src/column/column.entity';

export class TaskDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj }: { obj: { column: Column } }) => obj.column.id)
  columnId: number;
}
