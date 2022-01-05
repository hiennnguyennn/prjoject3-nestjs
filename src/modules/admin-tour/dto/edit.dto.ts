import { ApiProperty } from '@nestjs/swagger';

export class EditTourDto {
  @ApiProperty({
    type: String,
    description: 'tour name',
    default: '',
  })
  readonly name: string;

  @ApiProperty({
    type: [Number],
    description: 'destination id',
    default: [],
  })
  des: number[];

  @ApiProperty({
    type: String,
    description: 'tour description',
    default: '',
  })
  readonly description: string;

  @ApiProperty({
    type: String,
    description: 'tour price',
  })
  price: string;

  @ApiProperty({
    type: Number,
    description: 'tour require min age',
  })
  readonly minAge: number;

  @ApiProperty({
    type: Number,
    description: 'tour days',
  })
  readonly days: number;

  @ApiProperty({
    type: String,
    description: 'tour departure address',
    default: '',
  })
  readonly departureAddr: string;

  @ApiProperty({
    type: String,
    description: 'tour time start',
    required: false,
  })
  timeStart: string;

  @ApiProperty({
    type: String,
    description: 'tour time return',
    required: false,
  })
  timeReturn: string;

  @ApiProperty({
    type: String,
    description: 'tour dresscode',
    required: false,
  })
  readonly dresscode: string;

  @ApiProperty({
    type: String,
    description: 'tour included',
    required: false,
  })
  readonly included: string;

  @ApiProperty({
    type: String,
    description: 'tour not included',
    required: false,
  })
  readonly notIncluded: string;

  @ApiProperty({
    type: Number,
    description: 'tour status',
    required: true,
  })
  status: number;

  @ApiProperty({
    type: ['file'],
    description: 'destination images',
    required: false,
    default: [],
  })
  image: any[];

  @ApiProperty({
    type: String,
    description: 'destination current images',
    required: false,
  })
  oldImage: string;
}
