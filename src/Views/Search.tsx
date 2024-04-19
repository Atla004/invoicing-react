import Navbar from "../Components/Navbar";
import SearchInvoiceTable from "../Components/InvoiceTable";

export type Invoices = {
    clientName: string;
    invoiceId: string;
    totalAmount: number;
  };

export default function Search() {

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
            <Navbar />
            <h1 className="text-5xl font-bold text-center text-white mt-6 mb-4">Búsqueda de Facturas</h1>
            <div className="p-2 w-full rounded-lg">
                <div className="w-[920px] mx-auto mt-3">
                   
                    <SearchInvoiceTable />
                </div>
            </div>
        </div>
    );
}