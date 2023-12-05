import { IsEmail, IsNotEmpty, Length } from 'class-validator';
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
}
