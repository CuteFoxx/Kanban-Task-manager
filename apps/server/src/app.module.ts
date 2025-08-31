import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardService } from './board/board.service';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Board],
      synchronize: true,
    }),
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
