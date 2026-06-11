import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateMessageStatusDto } from './dto/message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MessageStatus } from './schemas/message.schema';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  // Public: contact form submission
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit contact form message (public)' })
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  // Admin: list all messages
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get all messages' })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: MessageStatus,
  ) {
    return this.messagesService.findAll(+page, +limit, status);
  }

  // Admin: message stats
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get message statistics' })
  getStats() {
    return this.messagesService.getStats();
  }

  // Admin: single message (auto-marks read)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Get single message' })
  findOne(@Param('id') id: string) {
    return this.messagesService.findById(id);
  }

  // Admin: update status / reply
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update message status or add reply' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateMessageStatusDto) {
    return this.messagesService.updateStatus(id, dto);
  }

  // Admin: delete message
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Delete message' })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
