import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsNumber, isNumber, IsOptional } from 'class-validator';

export class ListTourDto {
  @ApiProperty({ type: String, required: false, description: 'search' })
  @IsOptional()
  readonly search: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'category search',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly category: number;

  @ApiProperty({ type: String, required: false, default: 'desc' })
  sort: string;

  @ApiProperty({ required: false, default: 10 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ required: false, default: 1 })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;
}
