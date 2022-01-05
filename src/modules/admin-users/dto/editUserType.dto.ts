import { ApiProperty } from '@nestjs/swagger';

export class EditUserTypeDto {
  @ApiProperty({
    type: Number,
    description: 'user id',
  })
  readonly id: number;

  @ApiProperty({
    type: Number,
    description: 'new role',
  })
  readonly role: number;
}
