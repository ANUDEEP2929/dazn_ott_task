import { IsEmail, IsIn, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { TYPES } from '../../types';
import { ApiProperty } from '@nestjs/swagger';

export class UserAddPayload {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is Required' })
  @ApiProperty()
  email: string;

  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  @IsNotEmpty({ message: 'Password is Required' })
  @ApiProperty()
  password: string;

  @Length(1, 20, {
    message: 'Name length Must be between 1 and 20 charcters',
  })
  @IsNotEmpty({ message: 'Name is Required' })
  @ApiProperty()
  name: string;

  @IsIn(TYPES.ROLES,{message: "Please Select Role from "+ TYPES.ROLES})
  @IsNotEmpty({ message: 'Role is Required' })
  @ApiProperty()
  role: string

  @IsOptional()
  @Length(10,10,{message:"Mobile Length Need To Be 10 Digits"})
  @ApiProperty()
  mobile_number:string

}