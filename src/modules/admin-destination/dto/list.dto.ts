import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { sort } from 'src/modules/admin-users/enum';
import { field } from '../enum';

export class ListDestinationDto {
  @ApiProperty({
    type: String,
    description: 'search by destination name, country or creator name',
    default: '',
    required: false,
  })
  readonly search: string;

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

  @ApiProperty({ type: String, required: false, default: 'createdAt' })
  sortField: string;
}
