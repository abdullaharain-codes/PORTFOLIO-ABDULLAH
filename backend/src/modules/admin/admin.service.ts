import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly messagesService: MessagesService,
  ) {}

  async getDashboardStats() {
    const [projectStats, messageStats] = await Promise.all([
      this.projectsService.getStats(),
      this.messagesService.getStats(),
    ]);

    return {
      projects: projectStats,
      messages: messageStats,
      lastUpdated: new Date().toISOString(),
    };
  }
}
