import { Board } from 'src/board/board.entity';
import { Task } from 'src/task/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as OrmColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @OrmColumn()
  name: string;

  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
