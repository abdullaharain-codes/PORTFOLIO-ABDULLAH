import { IsString, IsEmail, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MessageStatus } from '../schemas/message.schema';

export class CreateMessageDto {
  @ApiProperty({ example: 'John Smith' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Project Inquiry' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  subject: string;

  @ApiProperty({ example: 'Hi, I would like to discuss...' })
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  body: string;
}

export class UpdateMessageStatusDto {
  @ApiProperty({ enum: MessageStatus })
  @IsEnum(MessageStatus)
  status: MessageStatus;

  @IsOptional()
  @IsString()
  replyText?: string;
}
