export enum ComplaintStatus {
  NEW = 'NEW',
  UNDER_REVIEW = 'UNDER_REVIEW',
  INVESTIGATING = 'INVESTIGATING',
  CLOSED = 'CLOSED',
  REFERRED = 'REFERRED',
}

export interface SearchComplaintDto {
  caseNumber?: string;
  customerName?: string;
  customerEmail?: string;
  respondentName?: string;
  status?: ComplaintStatus;
  investigator?: string;
  dateReceivedFrom?: string;
  dateReceivedTo?: string;
  complaintType?: string;
}
