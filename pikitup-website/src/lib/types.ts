// ─── Users & Auth ─────────────────────────────────────────
export type UserRole =
  | "resident" | "business" | "call_centre"
  | "depot_manager" | "regional_manager"
  | "communications" | "supply_chain" | "hr"
  | "executive" | "admin" | "super_admin"
  | "applicant";

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  mobile: string;
  role: UserRole;
  address?: string;
  suburb?: string;
  region?: string;
  avatar?: string;
  businessName?: string;
  businessReg?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ─── Complaints ────────────────────────────────────────────
export type ComplaintStatus =
  | "submitted" | "received" | "assigned"
  | "in_progress" | "resolved" | "closed"
  | "reopened" | "escalated";

export type ComplaintType =
  | "missed-collection" | "illegal-dumping" | "overflowing-bins"
  | "street-not-swept" | "waste-spillage" | "facility-issue"
  | "truck-issue" | "general-complaint";

export const COMPLAINT_TYPE_LABELS: Record<ComplaintType, string> = {
  "missed-collection": "Missed Collection",
  "illegal-dumping": "Illegal Dumping",
  "overflowing-bins": "Overflowing Bins",
  "street-not-swept": "Street Not Swept",
  "waste-spillage": "Waste Spillage",
  "facility-issue": "Facility Issue",
  "truck-issue": "Truck Issue",
  "general-complaint": "General Complaint",
};

export const STATUS_LABELS: Record<ComplaintStatus, string> = {
  submitted: "Submitted",
  received: "Received",
  assigned: "Assigned",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
  reopened: "Reopened",
  escalated: "Escalated",
};

export interface ComplaintNote {
  id: string;
  note: string;
  isInternal: boolean;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  referenceNumber: string;
  type: ComplaintType;
  status: ComplaintStatus;
  description: string;
  address: string;
  suburb: string;
  region: string;
  photoUrls: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  depotId?: string;
  depotName?: string;
  assignedTo?: string;
  assignedToName?: string;
  notes: ComplaintNote[];
  slaDeadline?: string;
  isOverdue: boolean;
  priority: "low" | "medium" | "high" | "critical";
}

// ─── Facilities ────────────────────────────────────────────
export type FacilityStatus = "open" | "limited" | "closed" | "maintenance";
export type FacilityType = "depot" | "garden-refuse" | "landfill" | "recycling" | "customer-service";

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  region: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
  accepts: string[];
  status: FacilityStatus;
  phone: string;
  notice?: string;
}

// ─── Depots ────────────────────────────────────────────────
export interface Depot {
  id: string;
  name: string;
  region: string;
  address: string;
  manager: string;
  phone: string;
  email: string;
  openComplaints: number;
  resolvedToday: number;
  overdue: number;
}

// ─── Notifications ─────────────────────────────────────────
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  createdAt: string;
  href?: string;
}

// ─── Collection Schedule ───────────────────────────────────
export interface CollectionSchedule {
  suburb: string;
  region: string;
  depot: string;
  collectionDay: string;
  nextCollection: string;
  recyclingDay: string;
  gardenDay: string;
}

// ─── Dashboard Stats ───────────────────────────────────────
export interface DashboardStats {
  total: number;
  open: number;
  resolved: number;
  overdue: number;
  escalated: number;
  resolvedToday: number;
  byRegion: { region: string; count: number; resolved: number }[];
  byType: { type: string; count: number }[];
  resolutionRate: number;
  avgResolutionDays: number;
}

// ─── Tenders ───────────────────────────────────────────────
export interface Tender {
  id: string;
  refNumber: string;
  title: string;
  type: "Tender" | "RFQ";
  description: string;
  value: string;
  closingDate: string;
  status: "open" | "closing-soon" | "awarded" | "cancelled";
  documents: string[];
}

// ─── Business ──────────────────────────────────────────────
export interface BusinessProfile {
  id: string;
  businessName: string;
  registrationNumber: string;
  contactPerson: string;
  email: string;
  mobile: string;
  businessAddress: string;
  serviceType: string;
  accountRef?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  period: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: "paid" | "outstanding" | "overdue";
  description: string;
}

export interface BusinessServiceAgreement {
  accountRef: string;
  serviceType: string;
  collectionFrequency: string;
  collectionDay: string;
  nextCollection: string;
  binSize: string;
  binCount: number;
  depot: string;
  contractStart: string;
  contractEnd: string;
  status: "active" | "suspended" | "expired";
}

// ─── Audit ─────────────────────────────────────────────────
export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  module: string;
  recordId?: string;
  oldValue?: string;
  newValue?: string;
  ip: string;
  createdAt: string;
}

// ─── API ───────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Careers ───────────────────────────────────────────────
export type ApplicationStatus =
  | "submitted" | "screening" | "shortlisted"
  | "interview_scheduled" | "interviewed"
  | "offer_made" | "hired" | "rejected" | "withdrawn";

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  submitted:           "Submitted",
  screening:           "Screening",
  shortlisted:         "Shortlisted",
  interview_scheduled: "Interview Scheduled",
  interviewed:         "Interviewed",
  offer_made:          "Offer Made",
  hired:               "Hired",
  rejected:            "Rejected",
  withdrawn:           "Withdrawn",
};

export interface CareerVacancy {
  id: string;
  title: string;
  department: string;
  type: "Permanent" | "Fixed-Term" | "Contract";
  region: string;
  grade: string;
  salary?: string;
  closingDate: string;
  status: "open" | "closing-soon" | "filled" | "cancelled";
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationCount: number;
}

export interface ApplicationNote {
  id: string;
  note: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

export interface Application {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  department: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  idNumber: string;
  address: string;
  education: string;
  experience: string;
  coverLetter: string;
  cvFileName?: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  interviewDate?: string;
  notes: ApplicationNote[];
}
