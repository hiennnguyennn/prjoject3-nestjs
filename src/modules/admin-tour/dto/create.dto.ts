import { ApiProperty } from '@nestjs/swagger';

export class CreateTourDto {
  @ApiProperty({
    type: String,
    description: 'tour name',
    default: '',
  })
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'destination id',
    default: [],
  })
  des: string;

  @ApiProperty({
    type: Number,
    description: 'from id',
  })
  from: number;

  @ApiProperty({
    type: [String],
  })
  plan_titles: string[];
  @ApiProperty({
    type: [String],
  })
  plan_includes: string[];
  @ApiProperty({
    type: [String],
  })
  plan_notIncludes: string[];
  @ApiProperty({
    type: [String],
  })
  plan_descriptions: string[];

  @ApiProperty({
    type: String,
    description: 'category id',
    default: [],
  })
  category: string;

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
}
