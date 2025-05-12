import {
  BookMarked,
  ChartNoAxesCombined,
  CreditCard,
  Receipt,
  ReceiptText,
  Ticket,
  UnfoldVertical,
  Wallet,
} from "lucide-react";
import { AddSalaryModal } from "./_components/manage-data/add-salary";
import { AddPayableModal } from "./_components/manage-data/add-payable";
import { AddReceivableModal } from "./_components/manage-data/add-receivable";
import { AddPettyCashModal } from "./_components/manage-data/add-petty";
import { AddJournalModal } from "./_components/manage-data/add-journal";
import { AddFinancialStatementModal } from "./_components/manage-data/add-financial";
import { AddInvoiceModal } from "./_components/manage-data/add-invoice";
import { AddInternalPaymentModal } from "./_components/manage-data/add-internal";

export const AccountsManageData = () => {
  return (
    <div className="p-4 w-full">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl text-slate-950 mb-4">Add Records</h1>
        <div className="flex flex-wrap gap-2 mb-4 w-full">
          <AddSalaryModal
            icon={<Wallet size={15} />}
            iconBg="bg-[#2CAA5D]"
            label="Salary Payment"
          />
          <AddPayableModal
            icon={<UnfoldVertical size={15} />}
            iconBg="bg-[#3B82F6]"
            label="Payable"
          />
          <AddReceivableModal
            icon={<CreditCard size={15} />}
            iconBg="bg-[#F59E0B]"
            label="Receivable"
          />
          <AddPettyCashModal
            icon={<Receipt size={15} />}
            iconBg="bg-[#10B981]"
            label="Petty Cash"
          />
          <AddJournalModal
            icon={<BookMarked size={15} />}
            iconBg="bg-[#8B5CF6]"
            label="Journal Entry"
          />
          <AddFinancialStatementModal
            icon={<ChartNoAxesCombined size={15} />}
            iconBg="bg-[#EF4444]"
            label="Financial Statement"
          />
          <AddInvoiceModal
            icon={<Ticket size={15} />}
            iconBg="bg-[#3F3F46]"
            label="Invoice"
          />
          <AddInternalPaymentModal
            icon={<ReceiptText size={15} />}
            iconBg="bg-[#14B8A6]"
            label="Internal Payment"
          />
        </div>
      </div>
      <h1 className="text-2xl text-slate-950 mb-4">Records</h1>
    </div>
  );
};
