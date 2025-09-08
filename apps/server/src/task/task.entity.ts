import { Column as BoardColumn } from 'src/column/column.entity';
import { Subtask } from 'src/subtask/subtask.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('varchar', { length: 512 })
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  column: BoardColumn;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subTasks: Subtask[];
}
