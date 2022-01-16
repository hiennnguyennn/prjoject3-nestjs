import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ChangeTicketDto {
  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  readonly ticketId: string;

  @ApiProperty({ type: Number, required: true })
  @Type(() => Number)
  status: number;
}
