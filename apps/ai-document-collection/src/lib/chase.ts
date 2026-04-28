export type ChasePlanStatus = "NONE" | "SENT" | "RESOLVED";

export interface ChasePlan {
  id: string;
  clientId: string;
  engagementId: string;
  status: ChasePlanStatus;
  createdAt: string;
  updatedAt: string;
  /** ExpectedItemInstance IDs at time of send. */
  expectedItemIds: string[];
}

export interface ChaseStore {
  chasePlans: ChasePlan[];
}
