import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailProvider {
  private readonly logger = new Logger(EmailProvider.name);

  async sendEmail(to: string, caseNumber: string, customerName: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: `Complaint Submitted - Case #${caseNumber}`,
      text: `Hello ${customerName},

Your complaint has been successfully submitted.

Case Number: ${caseNumber}

Thank you.`,
    });

    this.logger.log(`Email sent to ${to}`);
  }
}