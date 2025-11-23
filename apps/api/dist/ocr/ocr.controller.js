"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrController = void 0;
const common_1 = require("@nestjs/common");
const generative_ai_1 = require("@google/generative-ai");
let OcrController = class OcrController {
    genAI;
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not defined');
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    async mapOcrText(text) {
        console.log('Received OCR text:', text);
        const model = this.genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
        });
        const prompt = `
The following OCR text comes from a Delaware DMV complaint form. 
Your job is to extract the fields based ONLY on the ordering below.

THE OCR ALWAYS APPEARS IN THIS EXACT ORDER:

1. Customer Name
2. Customer Phone
3. Customer Email
4. Customer Address
5. Customer City, State Zip (all on one line, e.g. "Newark DE 19716")

6. Respondent Name
7. Respondent Phone
8. Respondent Address
9. Respondent City, State Zip

10. Dealership Representative Name (may be blank)

11. Blank line (IGNORE)
12. VIN broken into individual numbers with spaces (e.g. "2 4 5 6 7 1 ...")
13. Line: "YEAR Make MODEL" (e.g. "2019 Make Accord")
14. Line: "Color PlateNumber" (e.g. "White 3454")

15. Line with ✔ or empty (complaint type indicator)
16. One line of complaint explanation text.

DO NOT HALLUCINATE. Use ONLY what is present in the text.
If a value is missing, return an empty string.

SPECIAL RULES:
- VIN: remove all spaces
- For any "City State Zip" line, split into city, state, zip
- Complaint Type: return "checked" if ✔ exists, otherwise ""
- Explanation is the line AFTER ✔

OUTPUT JSON ONLY:

{
  "customerName": "",
  "customerPhone": "",
  "customerEmail": "",
  "customerAddress": "",
  "customerCity": "",
  "customerState": "",
  "customerZip": "",
  "respondentName": "",
  "respondentPhone": "",
  "respondentAddress": "",
  "respondentCity": "",
  "respondentState": "",
  "respondentZip": "",
  "dealershipRep": "",
  "vin": "",
  "year": "",
  "make": "",
  "model": "",
  "color": "",
  "plateNumber": "",
  "plateOrUtitle": "",
  "complaintType": "",
  "explainComplaint": "",
  "signatureConfirmed": false
}

OCR TEXT:
"""${text}"""
`;
        try {
            const result = await model.generateContent([prompt]);
            console.log("Gemini FULL RAW RESULT:", JSON.stringify(result, null, 2));
            const textOutput = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!textOutput) {
                throw new Error("Gemini returned no text output");
            }
            const cleaned = textOutput
                .replace(/```json/gi, '')
                .replace(/```/g, '')
                .trim();
            console.log("Cleaned JSON output from Gemini:", cleaned);
            const parsed = JSON.parse(cleaned);
            return parsed;
        }
        catch (err) {
            console.error("Gemini mapping failed:", err);
            return {
                customerName: "",
                customerPhone: "",
                customerEmail: "",
                customerAddress: "",
                customerCity: "",
                customerState: "",
                customerZip: "",
                respondentName: "",
                respondentPhone: "",
                respondentAddress: "",
                respondentCity: "",
                respondentState: "",
                respondentZip: "",
                dealershipRep: "",
                vin: "",
                year: "",
                make: "",
                model: "",
                color: "",
                plateNumber: "",
                plateOrUtitle: "",
                complaintType: "",
                explainComplaint: "",
                signatureConfirmed: false
            };
        }
    }
};
exports.OcrController = OcrController;
__decorate([
    (0, common_1.Post)('map'),
    __param(0, (0, common_1.Body)('text')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OcrController.prototype, "mapOcrText", null);
exports.OcrController = OcrController = __decorate([
    (0, common_1.Controller)('ocr'),
    __metadata("design:paramtypes", [])
], OcrController);
//# sourceMappingURL=ocr.controller.js.map