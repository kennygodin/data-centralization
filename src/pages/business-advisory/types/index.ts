export type BaseEntry = {
  id: string;
  weekEnding: string;
  enteredBy: string;
  enteredDate: string;
  lastEditedOn: string;
  lastEditedBy: string;
  note?: string;
  // lastEditedOn: string;
};

export type IncomeEntry = BaseEntry & {
  amount: number;
};

export type ClientEntry = BaseEntry & {
  totalClients: number;
};

export type ProspectEntry = BaseEntry & {
  totalProspects: number;
};
