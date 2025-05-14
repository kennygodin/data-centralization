export type BaseEntry = {
  enteredDate?: string;
  status?:
    | "Pending"
    | "Paid"
    | "Overdue"
    | "Partially Paid"
    | "Cancelled"
    | "Approved"
    | "Rejected"
    | "On Hold";
  approvedBy?: string;
};

export type SalaryEntry = BaseEntry & {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  salaryAmount: string;
  paymentDate: string;
  mode: "Bank Transfer" | "Cash" | "Cheque";
  invoiceNumber?: string;
};

export type PayableEntry = BaseEntry & {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  amountPayable: string;
  category: "Utilities" | "Rent" | "Office Supplies" | "Services" | "Misc";
  dueDate: string;
  paymentDate?: string;
  mode: "Bank Transfer" | "Cash" | "Cheque" | "Credit Card";
};

export type ReceivableEntry = BaseEntry & {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: string;
  category: "Services" | "Products" | "Subscriptions" | "Rent" | "Other";
  dueDate: string;
  paymentDate?: string;
  mode?: "Bank Transfer" | "Cash" | "Cheque" | "Credit Card" | "Online Payment";
};

export type PettyCashEntry = BaseEntry & {
  id: string;
  transferDate: string;
  description: string;
  amount: string;
  category:
    | "Office Supplies"
    | "Transportation"
    | "Meals"
    | "Utilities"
    | "Maintenance"
    | "Other";
  paidBy: string;
  receiptNumber?: string;
};

export type JournalEntry = BaseEntry & {
  id: string;
  date: string;
  entryType: "Debit" | "Credit" | "Adjustment" | "Reversal";
  description: string;
  accountName: string;
  referenceNumber?: string;
  amount?: string;
};

export type FinancialStatementEntry = BaseEntry & {
  id: string;
  reportType:
    | "Income Statement"
    | "Balance Sheet"
    | "Cash Flow Statement"
    | "Statement of Changes in Equity";
  startDate: string;
  endDate: string;
  totalRevenue: string;
  totalExpenses: string;
  netProfitLoss: string;
  generatedBy: string;
};

export type InvoiceEntry = BaseEntry & {
  id: string;
  invoiceNumber: string;
  clientVendorName: string;
  dateIssued: string;
  taxAmount?: string;
  totalAmount: string;
  paymentTerms: "Net 7" | "Net 15" | "Net 30" | "Net 60" | "Due on Receipt";
  paymentDate: string;
  mode: "Bank Transfer" | "Cash" | "Cheque" | "Credit Card" | "Online Payment";
};

export type InternalPaymentEntry = BaseEntry & {
  id: string;
  recipient: string;
  transactionDate: string;
  amount: string;
  mode: "Bank Transfer" | "Cash" | "Cheque" | "Credit Card" | "Online Payment";
  paymentType:
    | "Reimbursement"
    | "Advance"
    | "Salary Advance"
    | "Petty Cash"
    | "Other";
  department?: string;
  receiptAttached: boolean;
};

export type AllEntryTypes =
  | SalaryEntry
  | PayableEntry
  | ReceivableEntry
  | PettyCashEntry
  | JournalEntry
  | FinancialStatementEntry
  | InvoiceEntry
  | InternalPaymentEntry;
