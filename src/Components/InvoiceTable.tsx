"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

import SearchModalFactura from "../Components/SearchModalFactura"

const data: Payment[] = [
  {
    id: "2",
    monto: 12.1,
    estado: "Vigente",
    nombre: "Juan",
    apellido: "Pérez",
    cedula: 19576321,
    prefijo: "V-",
    fecha: "2021-09-01",
  },
  {
    id: "3",
    monto: 77,
    estado: "Vigente",
    nombre: "Miguel",
    apellido: "García",
    cedula: 10876349,
    prefijo: "V-",
    fecha: "2021-09-01",
  },
  {
    id: "4",
    monto: 92.4,
    estado: "Anulada",
    nombre: "Sabrina",
    apellido: "Bracho",
    cedula: 11579035,
    prefijo: "V-",
    fecha: "2021-09-01",
  },
  {
    id: "5",
    monto: 38.5,
    estado: "Vigente",
    nombre: "Andrea",
    apellido: "Colmenares",
    cedula: 31578239,
    prefijo: "V-",
    fecha: "2021-09-01",
  },
  {
    id: "6",
    monto: 22,
    estado: "Anulada",
    nombre: "Esteban",
    apellido: "Villalobos",
    cedula: 18463586,
    prefijo: "E-",
    fecha: "2020-09-01",
  },
  {
  id: "7",
  monto: 48.4,
  estado: "Anulada",
  nombre: "Victor",
  apellido: "González",
  cedula: 12861354,
  prefijo: "J-",
  fecha: "2021-09-01",
},
].map(item => ({
  ...item,
  prefijocedula: `${item.prefijo}${item.cedula}`,
})) as Payment[];

export type Payment = {
  id: string
  monto: number
  estado: "Anulada" | "Vigente"
  nombre: string
  apellido: string
  cedula: number
  fecha: string
  prefijo: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("estado")}</div>
    ),
  },
    {
    accessorKey: "fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("fecha")}</div>,
  },
  {
    accessorKey: "prefijocedula",
    header: () => <div className="text-center">Cédula</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("prefijocedula")}</div>,
  },
  {
    accessorKey: "nombre",
    header: () => <div className="text-center">Nombre</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("apellido")}</div>,
  },
  {
    accessorKey: "monto",
    header: () => <div className="text-center">Monto</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("monto"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-right">Detalles</div>,
    cell: ({ row }) => {
      const idNum = parseInt(row.getValue("id"))

      return (
        <div className = "text-right">
        <SearchModalFactura
        id={idNum}
    ></SearchModalFactura>
    </div>
      )
    },
  },
]


export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [position, setPosition] = React.useState("nada")
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="shadow-xl p-4 rounded-xl bg-white">
    <div className="w-full">
    <div className="flex items-center justify-center mb-6">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button className={`text-xl px-6 py-2 rounded-full bg-gray-600 text-white hover:bg-black ${position === 'nada' ? 'mt-2' : ''}`}>
  Filtrar Búsqueda
</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tipo de Filtro:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="nada">Ninguno</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="facturaid">ID de Factura</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="facturaest">Estado de Factura</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="fecha">Fecha de Factura</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="clienteced">Cédula de Cliente</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="clientenom">Nombre de Cliente</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    <div className="flex items-center py-4">
  <Input
    placeholder="Filtrar por ID de Factura..."
    value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("id")?.setFilterValue(event.target.value)
    }
    className={`ml-10 ${position === 'facturaid' ? '' : 'hidden'}`}
    style={{ width: '250px' }}
  />
  <Input
    placeholder="Filtrar por Estado de Factura..."
    value={(table.getColumn("estado")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("estado")?.setFilterValue(event.target.value)
    }
    className={` ml-10 ${position === 'facturaest' ? '' : 'hidden'}`}
    style={{ width: '250px' }}
  />
  <Input
    placeholder="Filtrar por Fecha (YYYY-MM-DD)..."
    value={(table.getColumn("fecha")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("fecha")?.setFilterValue(event.target.value)
    }
    className={` ml-10 ${position === 'fecha' ? '' : 'hidden'}`}
    style={{ width: '250px' }}
  />
  <Input
    placeholder="Filtrar por Cédula de Cliente..."
    value={(table.getColumn("prefijocedula")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("prefijocedula")?.setFilterValue(event.target.value)
    }
    className={`ml-10 ${position === 'clienteced' ? '' : 'hidden'}`}
    style={{ width: '250px' }}
  />
  <Input
    placeholder="Filtrar por Nombre de Cliente..."
    value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("nombre")?.setFilterValue(event.target.value)
    }
    className={`ml-10 ${position === 'clientenom' ? '' : 'hidden'}`}
    style={{ width: '250px' }}
  />
</div>
      </div>
      <div className="rounded-md border">
      <div style={{ maxHeight: '450px', overflowY: 'auto' }}>
  <Table>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center font-bold"
          >
            Sin resultados.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</div>
      </div>
    </div>
  </div>
  )
}
