import type {
  User, Complaint, ComplaintStatus, Facility,
  DashboardStats, Depot, AuditLog, ApiResponse, PaginatedResponse,
  CollectionSchedule, Notification, Invoice, BusinessServiceAgreement,
} from "./types";
import {
  DEMO_USERS, MOCK_COMPLAINTS, MOCK_FACILITIES,
  MOCK_STATS, MOCK_DEPOTS, MOCK_AUDIT_LOGS,
  MOCK_SCHEDULE, MOCK_NOTIFICATIONS, MOCK_INVOICES, MOCK_SERVICE_AGREEMENT,
} from "./mock-data";

// Simulated network delay (ms)
const DELAY = 350;
const delay = (ms = DELAY) => new Promise<void>((r) => setTimeout(r, ms));

function ok<T>(data: T): ApiResponse<T> {
  return { data, success: true };
}

// ─── Auth ──────────────────────────────────────────────────
export async function apiLogin(email: string, password: string) {
  await delay();
  const entry = DEMO_USERS[email.toLowerCase()];
  if (!entry || entry.password !== password) {
    throw new Error("Invalid email or password.");
  }
  const { password: _p, ...user } = entry;
  return ok({ token: `mock-token-${user.id}-${Date.now()}`, user });
}

// ─── Complaints ────────────────────────────────────────────
let complaints = [...MOCK_COMPLAINTS];

export async function apiGetComplaints(params?: {
  status?: ComplaintStatus;
  depotId?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse<Complaint>> {
  await delay();
  let filtered = [...complaints];
  if (params?.status) filtered = filtered.filter((c) => c.status === params.status);
  if (params?.depotId) filtered = filtered.filter((c) => c.depotId === params.depotId);
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const start = (page - 1) * pageSize;
  return {
    data: filtered.slice(start, start + pageSize),
    total: filtered.length, page, pageSize,
    totalPages: Math.ceil(filtered.length / pageSize),
  };
}

export async function apiGetComplaint(id: string): Promise<ApiResponse<Complaint>> {
  await delay();
  const c = complaints.find((x) => x.id === id);
  if (!c) throw new Error("Complaint not found.");
  return ok(c);
}

export async function apiUpdateComplaintStatus(
  id: string,
  status: ComplaintStatus,
  note?: string
): Promise<ApiResponse<Complaint>> {
  await delay();
  const idx = complaints.findIndex((x) => x.id === id);
  if (idx === -1) throw new Error("Complaint not found.");
  const now = new Date().toISOString();
  const updated: Complaint = {
    ...complaints[idx],
    status,
    updatedAt: now,
    notes: note
      ? [...complaints[idx].notes, { id: `n${Date.now()}`, note, isInternal: false, createdBy: "usr-003", createdByName: "Staff", createdAt: now }]
      : complaints[idx].notes,
  };
  complaints[idx] = updated;
  return ok(updated);
}

export async function apiAssignComplaint(
  id: string,
  depotId: string,
  assignedTo: string
): Promise<ApiResponse<Complaint>> {
  await delay();
  const depot = MOCK_DEPOTS.find((d) => d.id === depotId);
  const idx = complaints.findIndex((x) => x.id === id);
  if (idx === -1) throw new Error("Complaint not found.");
  const updated: Complaint = {
    ...complaints[idx],
    status: "assigned",
    depotId,
    depotName: depot?.name,
    assignedTo,
    updatedAt: new Date().toISOString(),
  };
  complaints[idx] = updated;
  return ok(updated);
}

// ─── Facilities ────────────────────────────────────────────
export async function apiGetFacilities(): Promise<ApiResponse<Facility[]>> {
  await delay(200);
  return ok([...MOCK_FACILITIES]);
}

// ─── Depots ────────────────────────────────────────────────
export async function apiGetDepots(): Promise<ApiResponse<Depot[]>> {
  await delay(200);
  return ok([...MOCK_DEPOTS]);
}

// ─── Dashboard Stats ───────────────────────────────────────
export async function apiGetStats(): Promise<ApiResponse<DashboardStats>> {
  await delay(300);
  return ok({ ...MOCK_STATS });
}

// ─── Users ─────────────────────────────────────────────────
export async function apiGetUsers(): Promise<ApiResponse<User[]>> {
  await delay();
  return ok(
    Object.values(DEMO_USERS).map(({ password: _p, ...u }) => u)
  );
}

// ─── Audit Logs ────────────────────────────────────────────
export async function apiGetAuditLogs(): Promise<ApiResponse<AuditLog[]>> {
  await delay();
  return ok([...MOCK_AUDIT_LOGS]);
}

// ─── Resident / Business complaint submission ───────────────
export async function apiSubmitComplaint(payload: {
  type: Complaint["type"];
  description: string;
  address: string;
  suburb: string;
  region: string;
  userId: string;
  priority?: Complaint["priority"];
}): Promise<ApiResponse<Complaint>> {
  await delay(600);
  const ref = `PKT-2026-${String(complaints.length + 1).padStart(6, "0")}`;
  const now = new Date().toISOString();
  const newComplaint: Complaint = {
    id: `cmp-${Date.now()}`,
    referenceNumber: ref,
    type: payload.type,
    status: "submitted",
    description: payload.description,
    address: payload.address,
    suburb: payload.suburb,
    region: payload.region,
    photoUrls: [],
    createdAt: now,
    updatedAt: now,
    userId: payload.userId,
    priority: payload.priority ?? "medium",
    isOverdue: false,
    notes: [],
  };
  complaints = [newComplaint, ...complaints];
  return ok(newComplaint);
}

export async function apiGetResidentComplaints(userId: string): Promise<PaginatedResponse<Complaint>> {
  await delay();
  const filtered = complaints.filter((c) => c.userId === userId);
  return { data: filtered, total: filtered.length, page: 1, pageSize: 50, totalPages: 1 };
}

export async function apiGetMySchedule(): Promise<ApiResponse<CollectionSchedule>> {
  await delay(200);
  return ok({ ...MOCK_SCHEDULE });
}

export async function apiGetMyNotifications(): Promise<ApiResponse<Notification[]>> {
  await delay(200);
  return ok([...MOCK_NOTIFICATIONS]);
}

// ─── Business Portal ───────────────────────────────────────
export async function apiGetBusinessComplaints(userId: string): Promise<PaginatedResponse<Complaint>> {
  await delay();
  const filtered = complaints.filter((c) => c.userId === userId);
  return { data: filtered, total: filtered.length, page: 1, pageSize: 50, totalPages: 1 };
}

export async function apiGetBusinessInvoices(): Promise<ApiResponse<Invoice[]>> {
  await delay(200);
  return ok([...MOCK_INVOICES]);
}

export async function apiGetBusinessServiceAgreement(): Promise<ApiResponse<BusinessServiceAgreement>> {
  await delay(200);
  return ok({ ...MOCK_SERVICE_AGREEMENT });
}
