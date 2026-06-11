import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

export enum ProjectStatus {
  LIVE = 'live',
  DRAFT = 'draft',
  ARCHIVED = 'archived',
}

export enum ProjectCategory {
  AI = 'AI',
  FULLSTACK = 'Full Stack',
  SAAS = 'SaaS',
  TOOLS = 'Tools',
  WEB = 'Web Apps',
  MOBILE = 'Mobile',
  OPENSOURCE = 'Open Source',
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ trim: true })
  shortDescription: string;

  @Prop({ type: [String], default: [] })
  techStack: string[];

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ trim: true })
  imageUrl: string;

  @Prop({ trim: true })
  githubUrl: string;

  @Prop({ trim: true })
  liveUrl: string;

  @Prop({
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  status: ProjectStatus;

  @Prop({
    type: String,
    enum: ProjectCategory,
    default: ProjectCategory.FULLSTACK,
  })
  category: ProjectCategory;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop({ trim: true })
  slug: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Auto-generate slug from title
ProjectSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = (this as any).title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});
