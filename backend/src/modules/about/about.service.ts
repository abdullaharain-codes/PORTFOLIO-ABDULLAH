import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About, AboutDocument } from './schemas/about.schema';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name) private aboutModel: Model<AboutDocument>,
  ) {}

  async get(): Promise<AboutDocument> {
    const about = await this.aboutModel.findOne().lean();
    if (!about) throw new NotFoundException('About data not configured yet');
    return about as AboutDocument;
  }

  async upsert(dto: Partial<About>): Promise<AboutDocument> {
    const existing = await this.aboutModel.findOne();
    if (existing) {
      return this.aboutModel
        .findByIdAndUpdate(existing._id, { $set: dto }, { new: true, runValidators: true })
        .lean() as any;
    }
    const about = new this.aboutModel(dto);
    return about.save();
  }
}
