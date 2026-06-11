import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { MessagesModule } from './modules/messages/messages.module';
import { AboutModule } from './modules/about/about.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // ─── Config ──────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ─── MongoDB ─────────────────────────────────────────
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.on('connected', () => console.log('✅ MongoDB connected'));
          connection.on('error', (err) => console.error('❌ MongoDB error:', err));
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    // ─── Feature Modules ─────────────────────────────────
    AuthModule,
    ProjectsModule,
    MessagesModule,
    AboutModule,
    AdminModule,
  ],
})
export class AppModule {}
