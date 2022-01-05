import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { sort, sortField } from '../enum';

export class ListUserDto {
  @ApiProperty({
    type: String,
    description: 'search by mail, username',
    required: false,
  })
  readonly search: string;

  @ApiProperty({
    type: String,
    description: 'search by roles',
    required: false,
  })
  readonly roles: string;

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

  @ApiProperty({ type: String, required: false, default: 'asc' })
  sort: string;
}
