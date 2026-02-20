import { Injectable, Logger } from '@nestjs/common';
import twilio from 'twilio';

@Injectable()
export class SmsProvider {
  private readonly logger = new Logger(SmsProvider.name);

  async sendSms(to: string, caseNumber: string, customerName: string): Promise<void> {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );

    const formattedTo = to.startsWith('+') ? to : `+1${to}`;

    await client.messages.create({
      body: `Hello ${customerName}, your complaint has been submitted successfully. Case Number: ${caseNumber}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedTo,
    });

    this.logger.log(`SMS sent to ${formattedTo}`);
  }
}