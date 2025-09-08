import { Expose } from 'class-transformer';

export class SubTaskDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  completed: boolean;
}
