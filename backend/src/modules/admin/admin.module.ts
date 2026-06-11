import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProjectsModule } from '../projects/projects.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [ProjectsModule, MessagesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
