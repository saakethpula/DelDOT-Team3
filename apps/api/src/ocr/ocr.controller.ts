import { Controller, Post, Body } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Controller('ocr')
export class OcrController {
  private genAI: GoogleGenerativeAI;

  constructor() {
    // Ensure API key is defined
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined');
    }

    // Initialize GoogleGenerativeAI with API key
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    //this.genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

  }

  @Post('map')
  async mapOcrText(@Body('text') text: string) {
    console.log('Received OCR text:', text);

    const model = this.genAI.getGenerativeModel({

      //model: "gemini-1.5-flash", // ✔ correct for v1 API
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
  
    // Extract the returned text safely
    const textOutput =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  
    if (!textOutput) {
      throw new Error("Gemini returned no text output");
    }
  
    // Clean Markdown fences if Gemini wrapped JSON
    const cleaned = textOutput
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();
  
    console.log("Cleaned JSON output from Gemini:", cleaned);
  
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
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
}
