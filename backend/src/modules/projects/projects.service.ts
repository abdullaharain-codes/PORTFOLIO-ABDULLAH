import {
  Injectable, NotFoundException, ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto, UpdateProjectDto, ProjectQueryDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(dto: CreateProjectDto): Promise<ProjectDocument> {
    const existing = await this.projectModel.findOne({ title: dto.title });
    if (existing) throw new ConflictException('A project with this title already exists');
    const project = new this.projectModel(dto);
    return project.save();
  }

  async findAll(query: ProjectQueryDto) {
    const { category, status, featured, page = 1, limit = 10 } = query;
    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured !== undefined) filter.featured = featured;

    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
      this.projectModel
        .find(filter)
        .sort({ featured: -1, sortOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.projectModel.countDocuments(filter),
    ]);

    return {
      data: projects,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async findFeatured(): Promise<ProjectDocument[]> {
    return this.projectModel
      .find({ featured: true, status: 'live' })
      .sort({ sortOrder: 1 })
      .limit(6)
      .lean() as any;
  }

  async findBySlug(slug: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findOne({ slug }).lean();
    if (!project) throw new NotFoundException(`Project "${slug}" not found`);
    return project as ProjectDocument;
  }

  async findById(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id).lean();
    if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
    return project as ProjectDocument;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectDocument> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true })
      .lean();
    if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
    return project as ProjectDocument;
  }

  async remove(id: string): Promise<{ message: string }> {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
    return { message: 'Project deleted successfully' };
  }

  async getStats() {
    const [total, live, draft, featured] = await Promise.all([
      this.projectModel.countDocuments(),
      this.projectModel.countDocuments({ status: 'live' }),
      this.projectModel.countDocuments({ status: 'draft' }),
      this.projectModel.countDocuments({ featured: true }),
    ]);
    return { total, live, draft, featured };
  }
}
