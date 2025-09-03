import { Column } from 'src/column/column.entity';
import {
  Column as OrmColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @OrmColumn()
  name: string;

  @OneToMany(() => Column, (column) => column.board, {
    cascade: true,
  })
  columns: Column[];
}
