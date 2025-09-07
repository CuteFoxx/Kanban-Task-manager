import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './subtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask])],
  providers: [SubtaskService],
  controllers: [SubtaskController],
})
export class SubtaskModule {}
