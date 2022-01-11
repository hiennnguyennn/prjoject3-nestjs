import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsNumber, isNumber, IsOptional } from 'class-validator';

export class EditUserDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  readonly gender: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly phone: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly dob: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly id_card: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  readonly address: string;
}
