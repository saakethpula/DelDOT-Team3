import { EmailProvider } from './providers/email.provider';
import { SmsProvider } from './providers/sms.provider';
export declare class NotificationService {
    private readonly emailProvider;
    private readonly smsProvider;
    private readonly logger;
    constructor(emailProvider: EmailProvider, smsProvider: SmsProvider);
    sendComplaintConfirmation(customerName: string, customerEmail: string | null, customerPhone: string | null, caseNumber: string): Promise<void>;
}
//# sourceMappingURL=notification.service.d.ts.map