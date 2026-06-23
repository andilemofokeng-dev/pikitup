import type {
  User, Complaint, Facility, Notification,
  DashboardStats, Depot, CollectionSchedule, AuditLog,
  CareerVacancy, Application, Invoice, BusinessServiceAgreement,
} from "./types";

// ─── Demo Users ────────────────────────────────────────────
export const DEMO_USERS: Record<string, User & { password: string }> = {
  "resident@demo.com": {
    id: "usr-001", name: "Thabo", surname: "Nkosi",
    email: "resident@demo.com", password: "demo1234",
    mobile: "0821234567", role: "resident",
    address: "14 Oak Avenue", suburb: "Sandton", region: "Region A — Johannesburg North",
    createdAt: "2025-03-15T10:00:00Z", lastLogin: "2026-06-09T08:30:00Z",
  },
  "business@demo.com": {
    id: "usr-002", name: "Sipho", surname: "Dlamini",
    email: "business@demo.com", password: "demo1234",
    mobile: "0719876543", role: "business",
    businessName: "Dlamini & Sons Trading (Pty) Ltd",
    businessReg: "2019/123456/07",
    address: "88 Commerce Street", suburb: "Randburg", region: "Region F — Johannesburg West",
    createdAt: "2025-01-10T09:00:00Z",
  },
  "agent@pikitup.co.za": {
    id: "usr-003", name: "Nomsa", surname: "Sithole",
    email: "agent@pikitup.co.za", password: "staff1234",
    mobile: "0115000100", role: "call_centre",
    createdAt: "2024-06-01T07:00:00Z",
  },
  "depot@pikitup.co.za": {
    id: "usr-004", name: "Samuel", surname: "Mokoena",
    email: "depot@pikitup.co.za", password: "staff1234",
    mobile: "0115000200", role: "depot_manager",
    createdAt: "2023-11-01T07:00:00Z",
  },
  "admin@pikitup.co.za": {
    id: "usr-005", name: "Ayanda", surname: "Mahlangu",
    email: "admin@pikitup.co.za", password: "admin1234",
    mobile: "0115000010", role: "super_admin",
    createdAt: "2023-01-01T07:00:00Z",
  },
  "hr@pikitup.co.za": {
    id: "usr-006", name: "Precious", surname: "Radebe",
    email: "hr@pikitup.co.za", password: "staff1234",
    mobile: "0115000300", role: "hr",
    createdAt: "2024-02-01T07:00:00Z",
  },
  "applicant@demo.com": {
    id: "usr-007", name: "Lebo", surname: "Khumalo",
    email: "applicant@demo.com", password: "demo1234",
    mobile: "0731234567", role: "applicant",
    address: "22 Protea Street", suburb: "Soweto", region: "Region D — Soweto",
    createdAt: "2026-05-10T09:00:00Z",
  },
};

// ─── Mock Complaints ───────────────────────────────────────
export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: "cmp-001", referenceNumber: "PKT-2026-000125",
    type: "missed-collection", status: "in_progress",
    description: "Refuse was not collected on Tuesday 03 June. Bags have been sitting at the kerb for 3 days.",
    address: "14 Oak Avenue", suburb: "Sandton", region: "Region A — Johannesburg North",
    photoUrls: [], createdAt: "2026-06-03T09:00:00Z", updatedAt: "2026-06-05T11:30:00Z",
    userId: "usr-001", depotId: "dep-001", depotName: "Halfway House Depot",
    assignedTo: "usr-004", assignedToName: "Samuel Mokoena",
    priority: "high", isOverdue: false,
    slaDeadline: "2026-06-07T09:00:00Z",
    notes: [
      { id: "n1", note: "Case received and assigned to Halfway House Depot.", isInternal: false, createdBy: "usr-003", createdByName: "Nomsa Sithole", createdAt: "2026-06-03T11:00:00Z" },
      { id: "n2", note: "Field supervisor dispatched to address.", isInternal: false, createdBy: "usr-004", createdByName: "Samuel Mokoena", createdAt: "2026-06-05T11:30:00Z" },
    ],
  },
  {
    id: "cmp-002", referenceNumber: "PKT-2026-000089",
    type: "illegal-dumping", status: "resolved",
    description: "Large illegal dump site at the corner of Pine and Oak Roads. Building rubble and household waste.",
    address: "Pine Road & Oak Road", suburb: "Fourways", region: "Region A — Johannesburg North",
    photoUrls: [], createdAt: "2026-05-20T14:00:00Z", updatedAt: "2026-05-25T16:00:00Z",
    userId: "usr-001", depotId: "dep-001", depotName: "Halfway House Depot",
    priority: "critical", isOverdue: false,
    notes: [
      { id: "n3", note: "Dump site cleared on 25 May 2026.", isInternal: false, createdBy: "usr-004", createdByName: "Samuel Mokoena", createdAt: "2026-05-25T16:00:00Z" },
    ],
  },
  {
    id: "cmp-003", referenceNumber: "PKT-2026-000201",
    type: "overflowing-bins", status: "submitted",
    description: "Public bins at Sandton City taxi rank overflowing. Strong smell and health concern.",
    address: "Sandton City Taxi Rank", suburb: "Sandton", region: "Region A — Johannesburg North",
    photoUrls: [], createdAt: "2026-06-09T07:30:00Z", updatedAt: "2026-06-09T07:30:00Z",
    userId: "usr-001", priority: "medium", isOverdue: false, notes: [],
  },
  // Business user complaints (usr-002)
  {
    id: "cmp-b01", referenceNumber: "PKT-2026-000156",
    type: "missed-collection", status: "resolved",
    description: "Business collection at 88 Commerce Street was missed on Monday 1 June. We have 4 bins outstanding.",
    address: "88 Commerce Street", suburb: "Randburg", region: "Region F — Johannesburg West",
    photoUrls: [], createdAt: "2026-06-01T08:00:00Z", updatedAt: "2026-06-03T14:00:00Z",
    userId: "usr-002", depotId: "dep-004", depotName: "Randburg Depot",
    priority: "high", isOverdue: false,
    notes: [
      { id: "bn1", note: "Commercial collection team dispatched. Collection completed 3 June.", isInternal: false, createdBy: "usr-004", createdByName: "Lindiwe Khumalo", createdAt: "2026-06-03T14:00:00Z" },
    ],
  },
  {
    id: "cmp-b02", referenceNumber: "PKT-2026-000192",
    type: "overflowing-bins", status: "in_progress",
    description: "Our 240L bins at the rear of premises are overflowing. Collection was scheduled for Friday but did not happen.",
    address: "88 Commerce Street", suburb: "Randburg", region: "Region F — Johannesburg West",
    photoUrls: [], createdAt: "2026-06-07T10:00:00Z", updatedAt: "2026-06-08T09:00:00Z",
    userId: "usr-002", depotId: "dep-004", depotName: "Randburg Depot",
    priority: "medium", isOverdue: false,
    notes: [
      { id: "bn2", note: "Assigned to Randburg commercial team for Monday visit.", isInternal: false, createdBy: "usr-003", createdByName: "Nomsa Sithole", createdAt: "2026-06-08T09:00:00Z" },
    ],
  },
  // Additional complaints for staff view
  {
    id: "cmp-004", referenceNumber: "PKT-2026-000178",
    type: "street-not-swept", status: "assigned",
    description: "Main Road in Diepsloot not swept for 2 weeks.",
    address: "Main Road", suburb: "Diepsloot", region: "Region A — Johannesburg North",
    photoUrls: [], createdAt: "2026-06-07T09:00:00Z", updatedAt: "2026-06-08T10:00:00Z",
    userId: "usr-006", depotId: "dep-002", depotName: "Diepsloot Depot",
    priority: "medium", isOverdue: false, notes: [],
  },
  {
    id: "cmp-005", referenceNumber: "PKT-2026-000142",
    type: "missed-collection", status: "escalated",
    description: "Collection missed for 3rd consecutive week in Soweto Zone 5.",
    address: "Zone 5, Soweto", suburb: "Soweto", region: "Region D — Soweto",
    photoUrls: [], createdAt: "2026-06-01T08:00:00Z", updatedAt: "2026-06-09T09:00:00Z",
    userId: "usr-007", depotId: "dep-003", depotName: "Soweto Depot",
    priority: "critical", isOverdue: true, notes: [],
  },
];

// ─── Mock Facilities ───────────────────────────────────────
export const MOCK_FACILITIES: Facility[] = [
  { id: "fac-001", name: "Halfway House Depot", type: "depot", region: "Region E — Midrand", address: "Halfway House, Midrand, 1685", lat: -25.9975, lng: 28.1199, hours: "Mon–Fri: 07:00–16:30 | Sat: 07:00–12:00", accepts: ["General waste", "Garden refuse drop-off"], status: "open", phone: "011 350 0000" },
  { id: "fac-002", name: "Midrand Garden Refuse Site", type: "garden-refuse", region: "Region E — Midrand", address: "Halfway House, Midrand, 1685", lat: -26.0010, lng: 28.1230, hours: "Mon–Sat: 07:00–17:00", accepts: ["Garden waste", "Prunings", "Grass clippings"], status: "limited", phone: "011 350 0100", notice: "Reduced capacity — maintenance works 9–15 June" },
  { id: "fac-003", name: "Robinson Deep Landfill", type: "landfill", region: "Region C — Johannesburg South", address: "Booysens Road, Johannesburg South, 2000", lat: -26.2455, lng: 27.9980, hours: "Mon–Sat: 07:00–17:00", accepts: ["General waste", "Rubble (limited)"], status: "open", phone: "011 350 0200" },
  { id: "fac-004", name: "Goudkoppies Landfill", type: "landfill", region: "Region D — Soweto", address: "Soweto, Johannesburg, 1804", lat: -26.2654, lng: 27.8891, hours: "Mon–Sat: 07:00–17:00", accepts: ["General waste"], status: "open", phone: "011 350 0300" },
  { id: "fac-005", name: "Linbro Park Recycling Drop-off", type: "recycling", region: "Region B — Johannesburg East", address: "Linbro Park, Johannesburg East, 2065", lat: -26.0934, lng: 28.1378, hours: "Mon–Fri: 08:00–17:00 | Sat: 08:00–13:00", accepts: ["Paper", "Plastic", "Glass", "Metal", "Cardboard"], status: "open", phone: "011 350 0400" },
  { id: "fac-006", name: "Northcliff Garden Refuse Site", type: "garden-refuse", region: "Region A — Johannesburg North", address: "Northcliff, Johannesburg, 2115", lat: -26.1392, lng: 27.9756, hours: "Mon–Sat: 07:00–17:00", accepts: ["Garden waste", "Prunings", "Organic material"], status: "closed", phone: "011 350 0500", notice: "Temporarily closed for major repairs — reopen 30 June" },
  { id: "fac-007", name: "Diepsloot Depot", type: "depot", region: "Region A — Johannesburg North", address: "Diepsloot, Johannesburg North, 2189", lat: -25.9368, lng: 28.0095, hours: "Mon–Fri: 07:00–16:30", accepts: ["General waste"], status: "open", phone: "011 350 0600" },
  { id: "fac-008", name: "Orange Farm Customer Service", type: "customer-service", region: "Region G — Orange Farm", address: "Orange Farm, Johannesburg, 1811", lat: -26.4818, lng: 27.8820, hours: "Mon–Fri: 08:00–16:00", accepts: [], status: "open", phone: "011 350 0700" },
];

// ─── Mock Depots ───────────────────────────────────────────
export const MOCK_DEPOTS: Depot[] = [
  { id: "dep-001", name: "Halfway House Depot", region: "Region E — Midrand", address: "Halfway House, Midrand", manager: "Samuel Mokoena", phone: "011 350 0000", email: "midrand@pikitup.co.za", openComplaints: 14, resolvedToday: 8, overdue: 2 },
  { id: "dep-002", name: "Diepsloot Depot", region: "Region A — Johannesburg North", address: "Diepsloot, JHB North", manager: "Zanele Moyo", phone: "011 350 0600", email: "diepsloot@pikitup.co.za", openComplaints: 22, resolvedToday: 11, overdue: 4 },
  { id: "dep-003", name: "Soweto Depot", region: "Region D — Soweto", address: "Soweto, Johannesburg", manager: "Moses Dube", phone: "011 350 0200", email: "soweto@pikitup.co.za", openComplaints: 38, resolvedToday: 15, overdue: 9 },
  { id: "dep-004", name: "Randburg Depot", region: "Region F — Johannesburg West", address: "Randburg, Johannesburg", manager: "Lindiwe Khumalo", phone: "011 350 0300", email: "randburg@pikitup.co.za", openComplaints: 17, resolvedToday: 9, overdue: 1 },
];

// ─── Mock Notifications ────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "ntf-001", title: "Case Update", message: "Your case PKT-2026-000125 has been assigned to Halfway House Depot.", type: "info", isRead: false, createdAt: "2026-06-05T11:30:00Z", href: "/resident-portal/cases/cmp-001" },
  { id: "ntf-002", title: "Collection Reminder", message: "Your next refuse collection is tomorrow — Tuesday 10 June. Please put bins out by 06:00.", type: "success", isRead: false, createdAt: "2026-06-09T18:00:00Z" },
  { id: "ntf-003", title: "Service Notice", message: "Youth Day 16 June: your Tuesday collection moves to Wednesday 17 June.", type: "warning", isRead: true, createdAt: "2026-06-05T09:00:00Z", href: "/news/youth-day-notice" },
];

// ─── Mock Collection Schedule ──────────────────────────────
export const MOCK_SCHEDULE: CollectionSchedule = {
  suburb: "Sandton", region: "Region A — Johannesburg North",
  depot: "Halfway House Depot", collectionDay: "Tuesday",
  nextCollection: "Tuesday, 10 June 2026",
  recyclingDay: "Thursday (every 2 weeks)",
  gardenDay: "Friday",
};

// ─── Dashboard Stats ───────────────────────────────────────
export const MOCK_STATS: DashboardStats = {
  total: 1247, open: 312, resolved: 896, overdue: 39, escalated: 8, resolvedToday: 43,
  resolutionRate: 87.4, avgResolutionDays: 1.8,
  byRegion: [
    { region: "Region A", count: 198, resolved: 156 },
    { region: "Region B", count: 143, resolved: 119 },
    { region: "Region C", count: 167, resolved: 143 },
    { region: "Region D", count: 312, resolved: 248 },
    { region: "Region E", count: 156, resolved: 134 },
    { region: "Region F", count: 189, resolved: 162 },
    { region: "Region G", count: 82,  resolved: 70 },
  ],
  byType: [
    { type: "Missed Collection", count: 489 },
    { type: "Illegal Dumping",   count: 287 },
    { type: "Overflowing Bins",  count: 176 },
    { type: "Street Not Swept",  count: 134 },
    { type: "Waste Spillage",    count: 89 },
    { type: "Facility Issue",    count: 72 },
  ],
};

// ─── Mock Audit Logs ───────────────────────────────────────
export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "aud-001", userId: "usr-005", userName: "Ayanda Mahlangu", role: "super_admin", action: "STATUS_CHANGE", module: "Complaints", recordId: "cmp-001", oldValue: "assigned", newValue: "in_progress", ip: "196.25.1.10", createdAt: "2026-06-05T11:30:00Z" },
  { id: "aud-002", userId: "usr-003", userName: "Nomsa Sithole", role: "call_centre", action: "CREATE", module: "Complaints", recordId: "cmp-003", ip: "196.25.1.11", createdAt: "2026-06-09T07:30:00Z" },
  { id: "aud-003", userId: "usr-005", userName: "Ayanda Mahlangu", role: "super_admin", action: "PUBLISH", module: "News", recordId: "news-015", ip: "196.25.1.10", createdAt: "2026-06-08T14:00:00Z" },
];

// ─── Career Vacancies ──────────────────────────────────────
export const MOCK_CAREER_VACANCIES: CareerVacancy[] = [
  {
    id: "vac-001", title: "Regional Manager — Johannesburg South", department: "Operations",
    type: "Permanent", region: "Region C — Johannesburg South", grade: "M3",
    salary: "R 850,000 – R 1,050,000 per annum (CTC)",
    closingDate: "2026-06-30", status: "open", posted: "2026-06-02",
    applicationCount: 14,
    description: "Pikitup is seeking an experienced and dynamic Regional Manager to lead waste management operations across Johannesburg South. The successful candidate will oversee depot operations, manage field teams, and ensure service delivery targets are met.",
    requirements: [
      "Bachelor's degree in Environmental Management, Engineering, or related field",
      "Minimum 8 years' experience in waste management or municipal services",
      "Proven track record in managing large operational teams (50+ staff)",
      "Valid driver's licence (Code 8)",
      "Knowledge of relevant legislation (NEMA, Waste Act)",
    ],
    responsibilities: [
      "Oversee all waste collection operations in the assigned region",
      "Manage a team of depot supervisors and field operatives",
      "Monitor and report on service delivery KPIs",
      "Liaise with CoJ officials and community representatives",
      "Manage operational budget and resource allocation",
    ],
  },
  {
    id: "vac-002", title: "Fleet Controller", department: "Fleet Management",
    type: "Permanent", region: "All Regions — Johannesburg", grade: "C5",
    salary: "R 320,000 – R 420,000 per annum (CTC)",
    closingDate: "2026-06-18", status: "closing-soon", posted: "2026-06-04",
    applicationCount: 31,
    description: "Responsible for coordinating and monitoring the Pikitup vehicle fleet to ensure maximum availability and compliance with safety regulations.",
    requirements: [
      "Diploma in Fleet Management or Logistics",
      "Minimum 5 years' experience in fleet coordination",
      "Proficiency in fleet management software",
      "Code 14 driver's licence advantageous",
    ],
    responsibilities: [
      "Schedule and coordinate vehicle maintenance and repairs",
      "Monitor fleet GPS tracking and driver behaviour",
      "Manage fuel consumption and report on fleet KPIs",
      "Ensure compliance with roadworthiness requirements",
    ],
  },
  {
    id: "vac-003", title: "Communications Officer", department: "Communications",
    type: "Fixed-Term", region: "Head Office — Johannesburg", grade: "C3",
    salary: "R 260,000 – R 340,000 per annum (CTC)",
    closingDate: "2026-07-10", status: "open", posted: "2026-06-08",
    applicationCount: 8,
    description: "Join the Pikitup Communications team and help shape our public messaging across digital and traditional media platforms.",
    requirements: [
      "Bachelor's degree in Communications, Journalism, or Public Relations",
      "Minimum 3 years' relevant experience",
      "Excellent written and verbal communication skills",
      "Experience with social media management and digital content",
    ],
    responsibilities: [
      "Draft press releases, speeches, and internal communications",
      "Manage social media platforms and community engagement",
      "Coordinate media inquiries and public relations activities",
      "Produce newsletter and website content",
    ],
  },
  {
    id: "vac-004", title: "Supply Chain Specialist", department: "Supply Chain",
    type: "Permanent", region: "Head Office — Johannesburg", grade: "C4",
    salary: "R 380,000 – R 480,000 per annum (CTC)",
    closingDate: "2026-07-25", status: "open", posted: "2026-06-10",
    applicationCount: 5,
    description: "Manage procurement processes, supplier relationships, and supply chain operations to support Pikitup's service delivery mandate.",
    requirements: [
      "Bachelor's degree in Supply Chain Management or related field",
      "CIPS certification advantageous",
      "Minimum 5 years' experience in public sector procurement",
      "Knowledge of PFMA and MFMA regulations",
    ],
    responsibilities: [
      "Manage end-to-end procurement processes",
      "Evaluate and manage supplier performance",
      "Ensure compliance with SCM policies and legislation",
      "Maintain accurate procurement records and reporting",
    ],
  },
  {
    id: "vac-005", title: "IT Systems Administrator", department: "Information Technology",
    type: "Permanent", region: "Head Office — Johannesburg", grade: "C4",
    salary: "R 350,000 – R 450,000 per annum (CTC)",
    closingDate: "2026-07-15", status: "open", posted: "2026-06-09",
    applicationCount: 19,
    description: "Maintain and support Pikitup's IT infrastructure, systems, and digital platforms to ensure operational continuity.",
    requirements: [
      "BSc Computer Science or equivalent IT qualification",
      "MCSA/MCSE or equivalent certifications",
      "Minimum 4 years' systems administration experience",
      "Experience with Azure/AWS cloud platforms",
    ],
    responsibilities: [
      "Administer Windows Server, Active Directory, and Azure environments",
      "Manage network infrastructure and cybersecurity controls",
      "Provide 2nd and 3rd line technical support",
      "Implement and maintain backup and disaster recovery procedures",
    ],
  },
];

// ─── Applications ──────────────────────────────────────────
export let MOCK_APPLICATIONS: Application[] = [
  {
    id: "app-001", vacancyId: "vac-001", vacancyTitle: "Regional Manager — Johannesburg South",
    department: "Operations",
    applicantId: "usr-007", applicantName: "Lebo Khumalo", applicantEmail: "applicant@demo.com",
    applicantPhone: "0731234567", idNumber: "9001015678087",
    address: "22 Protea Street, Soweto, 1804",
    education: "BCom Business Management — University of Johannesburg (2012)",
    experience: "7 years in municipal waste management, current role: Operations Supervisor at City of Tshwane (2019–present). Previous: Waste Collection Coordinator at Pikitup (2016–2019).",
    coverLetter: "I am a dedicated waste management professional with over 7 years of experience in municipal operations. I am passionate about service delivery and community upliftment...",
    cvFileName: "Lebo_Khumalo_CV_2026.pdf",
    status: "shortlisted",
    appliedAt: "2026-06-05T10:00:00Z", updatedAt: "2026-06-08T14:00:00Z",
    notes: [
      { id: "n1", note: "Strong candidate — extensive operational background. Recommend for shortlist.", createdBy: "usr-006", createdByName: "Precious Radebe", createdAt: "2026-06-07T09:00:00Z" },
    ],
  },
  {
    id: "app-002", vacancyId: "vac-001", vacancyTitle: "Regional Manager — Johannesburg South",
    department: "Operations",
    applicantId: "ext-001", applicantName: "Thandi Molefe", applicantEmail: "thandi.molefe@email.com",
    applicantPhone: "0825551234", idNumber: "8503125432087",
    address: "45 Sunflower Ave, Midrand, 1685",
    education: "BEng Civil Engineering — WITS University (2008). Postgraduate Diploma in Municipal Management — UNISA (2015).",
    experience: "12 years in infrastructure and waste management. Currently Operations Director at private waste company.",
    coverLetter: "With 12 years of progressive experience in waste management and infrastructure...",
    cvFileName: "Thandi_Molefe_CV.pdf",
    status: "interview_scheduled",
    appliedAt: "2026-06-03T09:00:00Z", updatedAt: "2026-06-09T11:00:00Z",
    interviewDate: "2026-06-17T10:00:00Z",
    notes: [
      { id: "n2", note: "Excellent profile. Interview scheduled for 17 June at 10:00.", createdBy: "usr-006", createdByName: "Precious Radebe", createdAt: "2026-06-09T11:00:00Z" },
    ],
  },
  {
    id: "app-003", vacancyId: "vac-002", vacancyTitle: "Fleet Controller",
    department: "Fleet Management",
    applicantId: "ext-002", applicantName: "Bongani Dlamini", applicantEmail: "bongani.d@email.com",
    applicantPhone: "0712345678", idNumber: "9207204321087",
    address: "7 Maple Close, Randburg, 2194",
    education: "Diploma in Logistics Management — TVET College (2014).",
    experience: "6 years fleet coordination at courier company. Proficient in FleetWave and Geotab systems.",
    coverLetter: "I have a strong track record in fleet management with demonstrated success in reducing downtime...",
    cvFileName: "Bongani_Dlamini_CV.pdf",
    status: "screening",
    appliedAt: "2026-06-06T14:00:00Z", updatedAt: "2026-06-06T14:00:00Z",
    notes: [],
  },
  {
    id: "app-004", vacancyId: "vac-002", vacancyTitle: "Fleet Controller",
    department: "Fleet Management",
    applicantId: "ext-003", applicantName: "Kagiso Sithole", applicantEmail: "kagiso.s@email.com",
    applicantPhone: "0839876543", idNumber: "9412186543087",
    address: "18 Oak Road, Soweto, 1804",
    education: "N6 Transport and Logistics — Northlink TVET (2016).",
    experience: "4 years as fleet dispatcher at logistics firm. Code 14 licence holder.",
    coverLetter: "My passion for fleet operations and commitment to efficiency aligns well with Pikitup's mandate...",
    cvFileName: "Kagiso_Sithole_CV.pdf",
    status: "submitted",
    appliedAt: "2026-06-08T08:30:00Z", updatedAt: "2026-06-08T08:30:00Z",
    notes: [],
  },
  {
    id: "app-005", vacancyId: "vac-003", vacancyTitle: "Communications Officer",
    department: "Communications",
    applicantId: "ext-004", applicantName: "Naledi Mokoena", applicantEmail: "naledi.m@email.com",
    applicantPhone: "0765432109", idNumber: "9609245678087",
    address: "34 Jacaranda Street, Pretoria, 0001",
    education: "BA Communications — University of Pretoria (2018).",
    experience: "4 years in corporate communications. Managed social media for City of Tshwane.",
    coverLetter: "I am a creative communications professional with demonstrated experience in public sector messaging...",
    cvFileName: "Naledi_Mokoena_CV.pdf",
    status: "shortlisted",
    appliedAt: "2026-06-09T10:00:00Z", updatedAt: "2026-06-10T09:00:00Z",
    notes: [],
  },
];

// ─── Business Mock Data ────────────────────────────────────
export const MOCK_INVOICES: Invoice[] = [
  { id: "inv-001", invoiceNumber: "PIK-INV-2026-0431", period: "June 2026",   issueDate: "2026-06-01", dueDate: "2026-06-30", amount: 3850.00, status: "outstanding", description: "Commercial Waste Collection — June 2026" },
  { id: "inv-002", invoiceNumber: "PIK-INV-2026-0389", period: "May 2026",    issueDate: "2026-05-01", dueDate: "2026-05-31", amount: 3850.00, status: "paid",        description: "Commercial Waste Collection — May 2026" },
  { id: "inv-003", invoiceNumber: "PIK-INV-2026-0321", period: "April 2026",  issueDate: "2026-04-01", dueDate: "2026-04-30", amount: 3850.00, status: "paid",        description: "Commercial Waste Collection — April 2026" },
  { id: "inv-004", invoiceNumber: "PIK-INV-2026-0255", period: "March 2026",  issueDate: "2026-03-01", dueDate: "2026-03-31", amount: 3850.00, status: "paid",        description: "Commercial Waste Collection — March 2026" },
  { id: "inv-005", invoiceNumber: "PIK-INV-2026-0188", period: "February 2026",issueDate: "2026-02-01",dueDate: "2026-02-28", amount: 3750.00, status: "paid",        description: "Commercial Waste Collection — February 2026" },
  { id: "inv-006", invoiceNumber: "PIK-INV-2026-0122", period: "January 2026",issueDate: "2026-01-01", dueDate: "2026-01-31", amount: 3750.00, status: "paid",        description: "Commercial Waste Collection — January 2026" },
];

export const MOCK_SERVICE_AGREEMENT: BusinessServiceAgreement = {
  accountRef: "BIZ-RBG-2026-00234",
  serviceType: "Commercial Waste Collection",
  collectionFrequency: "3× per week",
  collectionDay: "Monday, Wednesday, Friday",
  nextCollection: "Monday, 23 June 2026",
  binSize: "240 litre wheelie bins",
  binCount: 4,
  depot: "Randburg Depot",
  contractStart: "2026-01-01",
  contractEnd: "2026-12-31",
  status: "active",
};
