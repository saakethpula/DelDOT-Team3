export class UserDto {
  name?: string;
  email?: string;
}

export class VehicleDto {
  vin?: string;
  year?: number;
  make?: string;
  model?: string;
  color?: string;
  plateNumber?: string;
  plateOrUtitle?: string;
}

export class ComplaintDto {
  customerName: string;        
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  customerState: string;
  customerZip: string;

  respondentName?: string;
  respondentPhone?: string;
  respondentAddress?: string;
  respondentCity?: string;
  respondentState?: string;
  respondentZip?: string;

  dealershipRep?: string;
  complaintType?: string;
  explainComplaint?: string;

  signatureName?: string;
  signatureDate?: Date;

  dmvRepresentative?: string;
  dmvRepresentativeDate?: Date;
  dmvSupervisor?: string;
  dmvSupervisorDate?: Date;

  caseNumber?: string;
  dateReceived?: Date;
  investigator?: string;

  status?: "NEW" | "UNDER_REVIEW" | "INVESTIGATING" | "CLOSED" | "REFERRED";

  vehicle?: VehicleDto;
}
