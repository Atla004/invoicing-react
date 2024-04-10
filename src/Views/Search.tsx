import { useState } from "react";
import Navbar from "../Components/Navbar";
import InvoiceTable from "../Components/InvoiceTable";
import InvoiceInput from "../Components/InvoiceInput";

export type Invoices = {

    clientName: string;
    invoiceId: string;
    totalAmount: number;
    date: Date;
};

export default function Search() {

    const [invoices, setInvoices] = useState<{ clientName: string; invoiceId: string; totalAmount: number; date: Date }[]>([]);
    
return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
        <Navbar />
        <div className="p-2 w-full rounded-lg">
            <div className="w-[315px] mx-auto mt-12">
                {/*<InvoiceInput addEntry={addEntry} />*/}
            </div>
            <div className="w-[450px] mx-auto mt-12">

             <InvoiceTable />
            </div>
        </div>
    </div>
);
}