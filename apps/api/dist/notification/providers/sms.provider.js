"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SmsProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsProvider = void 0;
const common_1 = require("@nestjs/common");
const twilio_1 = __importDefault(require("twilio"));
let SmsProvider = SmsProvider_1 = class SmsProvider {
    logger = new common_1.Logger(SmsProvider_1.name);
    async sendSms(to, caseNumber, customerName) {
        const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const formattedTo = to.startsWith('+') ? to : `+1${to}`;
        await client.messages.create({
            body: `Hello ${customerName}, your complaint has been submitted successfully. Case Number: ${caseNumber}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedTo,
        });
        this.logger.log(`SMS sent to ${formattedTo}`);
    }
};
exports.SmsProvider = SmsProvider;
exports.SmsProvider = SmsProvider = SmsProvider_1 = __decorate([
    (0, common_1.Injectable)()
], SmsProvider);
//# sourceMappingURL=sms.provider.js.map