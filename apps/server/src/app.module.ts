import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';
import { ColumnModule } from './column/column.module';
import { Column } from './column/column.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Board, Column],
      synchronize: true,
    }),
    BoardModule,
    ColumnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
