export interface ICreateRecurringTransaction {
  title: string;
  amount: number;
  type: string;
  category: string;
  frequency: string;
  startDate: string;
  nextRunDate: string;
  isActive?: boolean;
}

export interface IUpdateRecurringTransaction {
  title?: string;
  amount?: number;
  type?: string;
  category?: string;
  frequency?: string;
  startDate?: string;
  nextRunDate?: string;
  isActive?: boolean;
}
