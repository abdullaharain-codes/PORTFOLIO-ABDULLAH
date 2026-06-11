import {
  IsString, IsArray, IsEnum, IsBoolean,
  IsOptional, IsNumber, IsUrl, MinLength, MaxLength,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProjectStatus, ProjectCategory } from '../schemas/project.schema';

export class CreateProjectDto {
  @ApiProperty({ example: 'AI Chat Assistant' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'A full-stack AI chat application...' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 'AI-powered chat with context memory' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: ['Next.js', 'OpenAI', 'MongoDB'] })
  @IsArray()
  @IsString({ each: true })
  techStack: string[];

  @ApiProperty({ example: ['Real-time messaging', 'Context memory'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'https://github.com/username/project' })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiProperty({ example: 'https://project.vercel.app' })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiProperty({ enum: ProjectStatus, default: ProjectStatus.DRAFT })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiProperty({ enum: ProjectCategory, default: ProjectCategory.FULLSTACK })
  @IsOptional()
  @IsEnum(ProjectCategory)
  category?: ProjectCategory;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export class ProjectQueryDto {
  @IsOptional()
  @IsEnum(ProjectCategory)
  category?: ProjectCategory;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  limit?: number = 10;
}
