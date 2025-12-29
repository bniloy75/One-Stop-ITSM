
export enum IncidentStatus {
  NEW = 'New',
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
}

export enum PriorityLevel {
    CRITICAL = 1,
    HIGH = 2,
    MODERATE = 3,
    LOW = 4,
}

export interface IncidentActivity {
    id: string;
    timestamp: string;
    user: string;
    type: 'system' | 'comment' | 'resolution';
    message: string;
}

export interface Incident {
  id: string;
  shortDescription: string;
  description?: string; // Extended description
  caller: string;
  assignmentGroup: string;
  status: IncidentStatus;
  priority: PriorityLevel;
  updated: string;
  resolutionCode?: string;
  resolutionNotes?: string;
  activityLog: IncidentActivity[];
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  assignedTo: string;
  status: 'In Use' | 'In Stock' | 'Retired';
  purchaseDate: string;
}

export interface ChangeRequest {
  id: string;
  shortDescription: string;
  type: 'Standard' | 'Normal' | 'Emergency';
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  assignedTo: string;
  plannedStartDate: string;
}

export interface SLA {
  id: string;
  name: string;
  type: 'SLA' | 'OLA' | 'Underpinning Contract';
  duration: string;
  condition: string;
  target: number;
  actual: number;
  status: 'Active' | 'Retired' | 'Draft';
}

export type UserRole = 'agent' | 'customer' | 'admin' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  groups?: string[]; // Resolver groups they belong to
}

export interface ResolverGroup {
    id: string;
    name: string;
    description: string;
    lead: string;
}

export interface AccessControl {
    role: UserRole;
    canView: string[];
    canEdit: string[];
    canDelete: string[];
}
