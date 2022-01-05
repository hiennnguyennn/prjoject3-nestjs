import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, required: true, description: 'user email' })
  readonly mail: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly password: string;
}
