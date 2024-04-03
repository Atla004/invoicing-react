import { useState, useMemo } from "react";
import { CiTrash } from "react-icons/ci";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { Payment } from "../Views/Invoicing";

interface PaymentTableProps {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  amountLeft: number;
}

export default function PaymentTable({ payments, setPayments, amountLeft }: PaymentTableProps) {
  const removeProduct = (index: number) => {
    const newPayments = [...payments];
    newPayments.splice(index, 1);
    console.log(index)
    setPayments(newPayments);
  }

  

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
            accessorFn: (row) => "$" + row.amount,
            header: "Cantidad",
            size: 50,
        },
        {
          id: "actions",
          header: "",
          Cell: ({row}) => (
            <button
              className="text-white bg-red-500 rounded-md p-1 w-8 h-8 hover:bg-red-700 transition-all grid place-items-center"
              onClick={() => removeProduct(row.index)}
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
  })
  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
        <h2 className="text-2xl mb-4 font-bold">Pagos</h2>
        <MaterialReactTable table={table}/>
        <div className="flex flex-row justify-end gap-4 mt-4">
            <h3 className="text-xl font-bold">Restante por pagar:</h3>
            <h3 className="text-xl font-bold">
              ${
                // round to two decimal places
                amountLeft.toFixed(2)
              }
            </h3>
        </div>
    </div>
        

  );
}
