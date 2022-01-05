import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'category name',
    required: true,
  })
  readonly name: string;
}
