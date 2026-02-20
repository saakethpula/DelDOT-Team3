import { Injectable, Logger } from '@nestjs/common';
import { EmailProvider } from './providers/email.provider';
import { SmsProvider } from './providers/sms.provider';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly smsProvider: SmsProvider,
  ) {}

  async sendComplaintConfirmation(
    customerName: string,
    customerEmail: string | null,
    customerPhone: string | null,
    caseNumber: string,
  ): Promise<void> {
    if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true' && customerEmail) {
      try {
        await this.emailProvider.sendEmail(customerEmail, caseNumber, customerName);
      } catch (error) {
        this.logger.error(`Failed to send email for case ${caseNumber}`, error);
      }
    }

    if (process.env.ENABLE_SMS_NOTIFICATIONS === 'true' && customerPhone) {
      try {
        await this.smsProvider.sendSms(customerPhone, caseNumber, customerName);
      } catch (error) {
        this.logger.error(`Failed to send SMS for case ${caseNumber}`, error);
      }
    }
  }
}