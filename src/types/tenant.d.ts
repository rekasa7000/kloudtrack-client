export interface Tenant {
  id: number;
  icon: React.ReactNode;
  tenantName: string;
  description: string;
  status: "Active" | "Inactive";
  dateCreated: string;
}
