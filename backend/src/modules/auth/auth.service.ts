import {
  Injectable, UnauthorizedException, ConflictException, OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Seed admin on startup if none exists
  async onModuleInit() {
    const count = await this.adminModel.countDocuments();
    if (count === 0) {
      const email = this.configService.get('ADMIN_EMAIL') || 'admin@portfolio.com';
      const password = this.configService.get('ADMIN_PASSWORD') || 'Admin@123';
      await this.adminModel.create({ email, password });
      console.log(`\n✅ Admin seeded: ${email}\n`);
    }
  }

  async login(email: string, password: string) {
    const admin = await this.adminModel
      .findOne({ email: email.toLowerCase() })
      .select('+password');

    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    if (!admin.isActive) throw new UnauthorizedException('Account is deactivated');

    const payload = { sub: admin._id, email: admin.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    };
  }

  async validateAdmin(id: string): Promise<AdminDocument | null> {
    return this.adminModel.findById(id).lean() as any;
  }

  async changePassword(id: string, currentPassword: string, newPassword: string) {
    const admin = await this.adminModel.findById(id).select('+password');
    if (!admin) throw new UnauthorizedException('Admin not found');

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect');

    admin.password = newPassword;
    await admin.save();
    return { message: 'Password updated successfully' };
  }
}
