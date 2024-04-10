import { useEffect, useMemo, useRef } from "react";
import { CiTrash } from "react-icons/ci";
import { useAtomValue } from "jotai";
import { invoiceStateAtom } from "../Atoms/atoms";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useKeyCombination } from "@/hooks";

import { Payment } from "../Views/Invoicing";
import { toast } from "sonner";
import { usdToBs } from "@/functions";

interface PaymentTableProps {
  payments: Payment[];
  setPayments: any;
  amountLeft: number;
}

export default function PaymentTable({ payments, setPayments, amountLeft }: PaymentTableProps) {

  const invoiceState = useAtomValue(invoiceStateAtom);

  const invoiceStateRef = useRef(invoiceState);

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    invoiceStateRef.current = invoiceState;
  });

  useKeyCombination(() => {
    titleRef.current?.focus();
    console.log("Focus on title");
  }, ["ctrl", "alt", "i"])


  const columns = useMemo<MRT_ColumnDef<Payment>[]>(() => {
    return [
        {
            accessorKey: "method",
            header: "Método", 
            size: 100,
        },
        {
            accessorFn: (row) => row.bank || "N/A",
            header: "Banco",
            size: 100,
        },
        {
            accessorFn: (row) => "$" + row.amount.toFixed(2),
            header: "Cantidad",
            size: 50,
        },
        {
          id: "actions",
          header: "",
          Cell: ({row}) => (
            <button
              className="text-white bg-red-500 rounded-md p-1 w-8 h-8 hover:bg-red-700 transition-all grid place-items-center"
              onClick={() => {
                if (invoiceStateRef.current !== "draft") {
                  toast.error("No puedes modificar una factura finalizada o anulada");
                  return;
                }
                setPayments((prev: Payment[]) => {
                  return prev.filter((p) => p !== row.original);
                });
              }}
            >
              <CiTrash />
            </button>
          ),
          size: 50,
        }
        
        
    ]
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: payments,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    initialState : {
      density: "compact"
    },
    muiTableContainerProps: {
      sx: {
        height: "280px",
        maxHeight: "280px"
      }
    }
    
  })
  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
        <h2 tabIndex={0} ref={titleRef} className="text-lg mb-4 font-bold focus:border-2">Pagos {invoiceState}</h2>
        <MaterialReactTable table={table}/>
        <div className="flex flex-row justify-end gap-4 mt-4">
            <h3 className="text-xl font-bold">Restante por pagar:</h3>
            <h3 className="text-xl font-bold">
              ${
                amountLeft.toFixed(2) + " "
              }
              (Bs. {usdToBs(amountLeft).toFixed(2)})
            </h3>
        </div>
        
    </div>
        

  );
}
