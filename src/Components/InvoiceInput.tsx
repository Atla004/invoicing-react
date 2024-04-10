import { Calendar } from "@/Components/ui/calendar";
import { useState } from "react";
import DialogSearch from "./DialogSearch";
import { CiSearch } from "react-icons/ci";
  
  
  interface InvoiceInputProps {
    addEntry: (entry: { code: string; clientName: string; totalAmount: number }) => void;
  }
  
  export default function InvoiceInput({ addEntry }: InvoiceInputProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [showModal, setShowModal] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [message, setMessage] = useState("");
    const [invoiceInfo, setInvoiceInfo] = useState({
      code: "",
      clientName: "",
      totalAmount: 0,
    });
    const messages = {
      code: "Buscar factura por código...",
      clientName: "Buscar factura por nombre del cliente..."
    }
  
    const controlledSetInvoiceInfo = (invoiceInfo: {
      code: string;
      clientName: string;
      totalAmount: number;
    }) => {
      setInvoiceInfo(invoiceInfo);
    };
  
    const controlledAddEntry = (entry: { code: string; clientName: string; totalAmount: number }) => {
      addEntry(entry);
      setInvoiceInfo({
        code: "",
        clientName: "",
        totalAmount: 0,
      });
    };
  
    const handleSearchClick = (field: "clientName"|"code") => {
      setMessage(messages[field]);
      setShowModal(true);
      setSearchField(field);
    };
    const invoiceFields = ["code", "clientName", "totalAmount"];
  
    return (
      <div className="shadow-xl p-4 rounded-md bg-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Búsqueda de Facturas</h1>
          <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-white align-middle m"
        />
          <div className="flex flex-row gap-1 justify-start items-center">
            <input
              type="text"
              id="invoice-code"
              className="h-8 w-full rounded-md border px-2 inline"
              placeholder="Código de la factura"
              value={invoiceInfo.code}
              onChange={(e) => {
                setInvoiceInfo({
                  ...invoiceInfo,
                  code: e.target.value,
                });
              }}
            />
            <button
              className="rounded-md p-1 inline h-8 font-bold hover:bg-slate-200 transition-all"
              onClick={() => handleSearchClick("code")}
            >
              <CiSearch />
            </button>
          </div>
  
          <div className="flex flex-row gap-1 justify-start items-center">
            <input
              type="text"
              id="client-name"
              className="h-8 w-full rounded-md border px-2 inline"
              placeholder="Nombre del cliente"
              value={invoiceInfo.clientName}
              onChange={(e) => {
                setInvoiceInfo({
                  ...invoiceInfo,
                  clientName: e.target.value,
                });
              }}
            />
            <button
              className="rounded-md p-1 inline h-8 font-bold hover:bg-slate-200 transition-all"
              onClick={() => handleSearchClick("clientName")}
            >
              <CiSearch />
            </button>
          </div>
          <button
            id="agregar-factura"
            className="bg-green-500 text-white rounded-md p-2 w-full"
            onClick={() => controlledAddEntry(invoiceInfo)}
          >
            Buscar
          </button>
        </div>
        <DialogSearch
          table="invoice"
          field={searchField}
          show={showModal}
          setShow={setShowModal}
          setData={controlledSetInvoiceInfo}
          fields={invoiceFields}
          message={message}
        />
      </div>
    );
  }
  