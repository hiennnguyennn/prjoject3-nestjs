import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsNumber, isNumber, IsOptional } from 'class-validator';

export class BookTourDto {
  @ApiProperty({ type: Number, required: true })
  readonly departureId: number;

  @ApiProperty({ type: Number, required: true })
  readonly number: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly message: string;
}
