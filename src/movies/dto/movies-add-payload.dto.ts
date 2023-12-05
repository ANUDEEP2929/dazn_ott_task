import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class MovieAddPayloadDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly genre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly streaming_link: string;
}
