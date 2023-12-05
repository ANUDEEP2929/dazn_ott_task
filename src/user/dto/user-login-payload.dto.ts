import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginPayload {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is Required' })
  @ApiProperty({
    type: 'string',
    description: 'User Email',
    required: true,
  })
  email: string;

  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  @IsNotEmpty({ message: 'Password is Required' })
  @ApiProperty({
    type: 'string',
    description: 'User Password',
    required: true,
  })
  password: string;
}
