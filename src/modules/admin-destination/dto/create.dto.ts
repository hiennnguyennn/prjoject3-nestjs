import { ApiProperty } from '@nestjs/swagger';

export class CreateDestinationDto {
  @ApiProperty({
    type: String,
    description: 'destination name',
    default: '',
  })
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'destination country',
    default: '',
  })
  readonly country: string;
  @ApiProperty({
    type: String,
    description: 'destination visa info',
    default: '',
  })
  readonly visa: string;

  @ApiProperty({
    type: String,
    description: 'destination language spoken',
    default: '',
  })
  readonly language: string;

  @ApiProperty({
    type: String,
    description: 'destination currency used',
    default: '',
  })
  readonly currency: string;

  @ApiProperty({
    type: String,
    description: 'destination area',
    default: '',
  })
  readonly area: number;

  @ApiProperty({
    type: ['file'],
    description: 'destination images',
    required: false,
    default: [],
  })
  image: any[];

  @ApiProperty({
    type: String,
    description: 'destination description',
  })
  readonly description: string;
}
