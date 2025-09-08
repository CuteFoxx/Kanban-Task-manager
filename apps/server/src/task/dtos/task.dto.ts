import { Expose, Transform, Type } from 'class-transformer';
import { Column } from 'src/column/column.entity';
import { SubTaskDto } from 'src/subtask/dtos/subtask.dto';
import { Subtask } from 'src/subtask/subtask.entity';

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

  @Expose()
  @Type(() => SubTaskDto)
  subTasks: Subtask[];
}
