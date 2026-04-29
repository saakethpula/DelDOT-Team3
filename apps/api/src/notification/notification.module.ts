import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailProvider } from './providers/email.provider';
import { SmsProvider } from './providers/sms.provider';

@Module({
  providers: [NotificationService, EmailProvider, SmsProvider],
  exports: [NotificationService],
})
export class NotificationModule {}