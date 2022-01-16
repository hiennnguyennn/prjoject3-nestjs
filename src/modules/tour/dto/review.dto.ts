import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ReviewDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  readonly ticketId: number;

  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  readonly rate: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly message: string;
}
