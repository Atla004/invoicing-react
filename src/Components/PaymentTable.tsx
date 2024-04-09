import { useMemo } from "react";
import { CiTrash } from "react-icons/ci";
import { useAtomValue } from "jotai";
import { invoiceStateAtom } from "../Atoms/atoms";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { Payment } from "../Views/Invoicing";
import { toast } from "sonner";

interface PaymentTableProps {
  payments: Payment[];
  setPayments: any;
  amountLeft: number;
}

export default function PaymentTable({ payments, setPayments, amountLeft }: PaymentTableProps) {

  const invoiceState = useAtomValue(invoiceStateAtom);

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
                setPayments((prev: Payment[]) => {
                  if (invoiceState !== "draft") {
                    toast.error("No puedes eliminar pagos de una factura finalizada o anulada");
                    return prev;
                  }
                    
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
        <h2 className="text-lg mb-4 font-bold">Pagos {invoiceState}</h2>
        <MaterialReactTable table={table}/>
        <div className="flex flex-row justify-end gap-4 mt-4">
            <h3 className="text-xl font-bold">Restante por pagar:</h3>
            <h3 className="text-xl font-bold">
              ${
                amountLeft.toFixed(2)
              }
            </h3>
        </div>
        
    </div>
        

  );
}
