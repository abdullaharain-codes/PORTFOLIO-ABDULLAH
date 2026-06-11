import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

export enum MessageStatus {
  UNREAD = 'unread',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, trim: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({
    type: String,
    enum: MessageStatus,
    default: MessageStatus.UNREAD,
  })
  status: MessageStatus;

  @Prop({ trim: true })
  replyText: string;

  @Prop()
  repliedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
