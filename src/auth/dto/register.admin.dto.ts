import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { gender } from 'src/modules/user/enum';

export class RegisterAdminDto {
  @ApiProperty({ type: String, required: true, description: 'username' })
  @IsString()
  readonly name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  readonly employeeId: string;

  @ApiProperty({ required: true, description: 'user email' })
  mail: string;

  // @ApiProperty({ required: true, description: 'phone' })
  // @IsString()
  // phone: string;

  // @ApiProperty({ type: Date, description: 'date of birth', required: false })
  // @IsDate()
  // @IsOptional()
  // @Type(() => Date)
  // readonly dob: Date;

  // @ApiProperty({ required: false, description: 'id card' })
  // @IsOptional()
  // @IsString()
  // id_card: string;

  // @ApiProperty({ required: false, description: 'address' })
  // @IsString()
  // @IsOptional()
  // address: string;

  @ApiProperty({ required: true, description: 'password' })
  password: string;
}
