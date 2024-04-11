import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiRead } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DatePicker } from "./ui/date-picker";
import { toast } from "sonner";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

export type Payment = {
  id: string;
  monto: number;
  estado: "Anulada" | "Vigente";
  nombre: string;
  apellido: string;
  cedula: number;
  fecha: string;
  prefijo: string;
};

type InvoiceEntry = {
  date: string;
  invoice_id: number;
  name: string;
  pid: string;
  pid_prefix: string;
  surname: string;
  total: number;
  void: boolean;
};

type FilterField = "name" | "invoice_id" | "date" | "pid" | "";

type FilterValue = string | number | Date;

const columns: MRT_ColumnDef<InvoiceEntry>[] = [
  {
    accessorKey: "invoice_id",
    header: "ID",
    size: 50,
  },
  {
    accessorFn(originalRow) {
      return `${originalRow.pid_prefix}-${originalRow.pid}`;
    },
    header: "ID Cliente",
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    size: 100,
  },
  {
    accessorKey: "surname",
    header: "Apellido",
    size: 100,
  },
  {
    accessorKey: "date",
    header: "Fecha",
    size: 50,
  },
  {
    accessorFn(originalRow) {
      return `USD ${originalRow.total}`;
    },
    header: "Total",
    size: 50,
  },
  {
    accessorFn(originalRow) {
      return originalRow.void ? "Anulada" : "Vigente";
    },
    header: "Estado",
    size: 50,
  },
  {
    accessorFn(originalRow) {
      return (
        <Link to={`/invoice/${originalRow.invoice_id}`}>
          <CiRead />
        </Link>
      );
    },
    header: "Ver",
    size: 20,
  },
];

export default function SearchInvoiceTable() {
  const [field, setField] = useState<FilterField>("");
  const [invoices, setInvoices] = useState<InvoiceEntry[]>([]);
  const [filterValue, setFilterValue] = useState<FilterValue>("");

  useEffect(() => {
    if (field === "name") {
      setFilterValue("");
    }
    else if (field === "pid" || field === "invoice_id") {
      setFilterValue("");
    }
    else if (field === "date") {
      setFilterValue(new Date());
    }
  }, [field]);

  const table = useMaterialReactTable({
    columns,
    data: invoices,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableGrouping: false,
    enableRowActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    initialState: {
      density: "compact",
    },
    muiTableContainerProps: {
      sx: {
        height: "280px",
        maxHeight: "280px"
      }
    }
  });

  const handleSearch = async () => {
    console.log('searching')
    
    if (!filterValue || !field) {
      toast.error("Por favor selecciona un campo e introduce un valor")
      return
    }
    const body = {
      field: field,
      value: ""
    }
    if (filterValue instanceof Date) {
      body.value = filterValue.toISOString().split('T')[0]
    }
    else {
      body.value = filterValue.toString()
    }
    const response = await fetch('http://127.0.0.1:5000/searchInvoice', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      type SearchResponse = {
        result: InvoiceEntry[]
      }
      const data:SearchResponse = await response.json()
      console.log(data)
      setInvoices(data.result)
    }
    
  } 
  return (
    <div className="grid">
      <div className="shadow-xl p-4 rounded-xl bg-white max-w-4xl">
        <div className="w-full">
          <div className="flex items-center justify-center mb-6 gap-2">
            <Select
              value={field}
              onValueChange={(value: FilterField) => setField(value)}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Selecciona un filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="name">Nombre del cliente</SelectItem>
                  <SelectItem value="pid">ID del cliente</SelectItem>
                  <SelectItem value="invoice_id">ID de la factura</SelectItem>
                  <SelectItem value="date">Fecha</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-[280px]">
              {
                field === "" && (
                  <Input
                    placeholder="Valor del filtro"
                    type={"text"}
                    disabled
                  />
                )
              }
              {field === "name" && (
                <Input
                  placeholder="Nombre del cliente"
                  type={"text"}
                  value={filterValue as string}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterValue(event.target.value)}
                />
              )}
              {field === "pid" && (
                <Input
                  placeholder="ID del cliente"
                  type={"number"}
                  value={filterValue as number}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterValue(parseInt(event.target.value))}
                />
              )}
              {field === "invoice_id" && (
                <Input
                  placeholder="ID de la factura"
                  type={"number"}
                  value={filterValue as number}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterValue(parseInt(event.target.value))}
                />
              )}
              {field === "date" && (
                <DatePicker
                  date={filterValue as Date}
                  setDate={(value) => setFilterValue(value)}
                />
              )}
            </div>
            <Button variant={"outline"} onClick={handleSearch}>
              <CiSearch className="w-5 h-5" />
            </Button>
          </div>
            <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
}
