import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: true })
export class About {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], default: [] })
  rotatingTitles: string[];

  @Prop({ required: true })
  bio: string;

  @Prop()
  shortBio: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  resumeUrl: string;

  @Prop()
  location: string;

  @Prop()
  email: string;

  @Prop({ type: Object, default: {} })
  socials: {
    github?: string;
    linkedin?: string;
    whatsapp?: string;
    twitter?: string;
  };

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Object, default: {} })
  stats: {
    yearsLearning?: number;
    projectsBuilt?: number;
    technologiesUsed?: number;
  };

  @Prop({
    type: [{
      category: String,
      items: [{ name: String, percentage: Number }],
    }],
    default: [],
  })
  skills: Array<{
    category: string;
    items: Array<{ name: string; percentage: number }>;
  }>;

  @Prop({
    type: [{
      icon: String,
      title: String,
      description: String,
    }],
    default: [],
  })
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  @Prop({
    type: [{
      role: String,
      company: String,
      period: String,
      description: String,
      type: String,
    }],
    default: [],
  })
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
    type: string;
  }>;

  @Prop({
    type: [{
      name: String,
      organization: String,
      date: String,
      verifyUrl: String,
    }],
    default: [],
  })
  certifications: Array<{
    name: string;
    organization: string;
    date: string;
    verifyUrl: string;
  }>;

  @Prop({
    type: [{
      quote: String,
      author: String,
      role: String,
      initials: String,
    }],
    default: [],
  })
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    initials: string;
  }>;

  @Prop({ type: [String], default: [] })
  techStack: string[];
}

export const AboutSchema = SchemaFactory.createForClass(About);
