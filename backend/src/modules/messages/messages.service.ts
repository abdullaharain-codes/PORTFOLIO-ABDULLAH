import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument, MessageStatus } from './schemas/message.schema';
import { CreateMessageDto, UpdateMessageStatusDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(dto: CreateMessageDto): Promise<MessageDocument> {
    const message = new this.messageModel(dto);
    return message.save();
  }

  async findAll(page = 1, limit = 20, status?: MessageStatus) {
    const filter: any = {};
    if (status) filter.status = status;
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.messageModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.messageModel.countDocuments(filter),
    ]);

    return {
      data: messages,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string): Promise<MessageDocument> {
    const msg = await this.messageModel.findById(id).lean();
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    // Auto-mark as read when opened
    if ((msg as any).status === MessageStatus.UNREAD) {
      await this.messageModel.findByIdAndUpdate(id, { status: MessageStatus.READ });
    }
    return msg as MessageDocument;
  }

  async updateStatus(id: string, dto: UpdateMessageStatusDto): Promise<MessageDocument> {
    const update: any = { status: dto.status };
    if (dto.replyText) {
      update.replyText = dto.replyText;
      update.repliedAt = new Date();
    }
    const msg = await this.messageModel
      .findByIdAndUpdate(id, { $set: update }, { new: true })
      .lean();
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    return msg as MessageDocument;
  }

  async remove(id: string): Promise<{ message: string }> {
    const msg = await this.messageModel.findByIdAndDelete(id);
    if (!msg) throw new NotFoundException(`Message ${id} not found`);
    return { message: 'Message deleted successfully' };
  }

  async getStats() {
    const [total, unread, read, replied] = await Promise.all([
      this.messageModel.countDocuments(),
      this.messageModel.countDocuments({ status: MessageStatus.UNREAD }),
      this.messageModel.countDocuments({ status: MessageStatus.READ }),
      this.messageModel.countDocuments({ status: MessageStatus.REPLIED }),
    ]);
    return { total, unread, read, replied };
  }
}
