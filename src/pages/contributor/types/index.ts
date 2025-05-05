export type BaseEntry = {
  id: string;
  weekEnding: string;
  enteredBy: string;
  enteredDate: string;
  lastModified: string;
  modifiedBy: string;
  note?: string;
  lastEditedOn: string;
};

export type IncomeEntry = BaseEntry & {
  amount: number;
};

export type ClientEntry = BaseEntry & {
  totalClients: number;
  clientName: string;
};

export type ProspectEntry = BaseEntry & {
  totalProspects: number;
  prospectName: string;
};
