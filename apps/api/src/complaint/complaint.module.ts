import { Module } from '@nestjs/common';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import { PrismaService } from 'src/prisma.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  controllers: [ComplaintController],
  providers: [ComplaintService, PrismaService],
})
export class ComplaintModule {}