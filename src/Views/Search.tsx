import { useState } from "react";
import Navbar from "../Components/Navbar";
import DataTableDemo from "../Components/InvoiceTable";
import InvoiceInput from "../Components/InvoiceInput";

export type Invoices = {
    clientName: string;
    invoiceId: string;
    totalAmount: number;
  };

export default function Search() {

return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
        <Navbar />
        <div className="p-2 w-full rounded-lg">
            <div className="w-[600px] mx-auto mt-12">
             <DataTableDemo />
            </div>
        </div>
    </div>
);
}