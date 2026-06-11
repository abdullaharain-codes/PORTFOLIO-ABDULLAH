import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { About } from './schemas/about.schema';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOperation({ summary: 'Get portfolio about data (public)' })
  get() {
    return this.aboutService.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update about/profile data' })
  upsert(@Body() dto: Partial<About>) {
    return this.aboutService.upsert(dto);
  }
}
