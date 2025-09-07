import { IsBoolean, IsString } from 'class-validator';

export class CreateSubtaskDto {
  @IsString()
  name: string;
}
