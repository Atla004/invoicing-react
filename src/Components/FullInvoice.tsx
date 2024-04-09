import { Invoice, Payment, ProductEntry } from "@/Views/Invoicing";
import {
  MRT_Table,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

const paymentColumns: MRT_ColumnDef<Payment>[] = [
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
];
const productColumns: MRT_ColumnDef<ProductEntry>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    size: 200,
  },
  {
    accessorKey: "code",
    header: "Código",
    size: 100,
  },
  {
    accessorFn: (row) => "$" + row.price.toFixed(2),
    header: "Precio",
    size: 50,
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    size: 50,
  },
];

export default function FullInvoice({ invoice }: { invoice: Invoice }) {
  const productTable = useMaterialReactTable({
    columns: productColumns,
    data: invoice.products,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
  });
  const paymentTable = useMaterialReactTable({
    columns: paymentColumns,
    data: invoice.payments,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
  });

  return (
    <div className="bg-white fixed inset-0 z-[1000] grid place-items-center">
      <div className="max-w-2xl">
        <div id="header">
          <h1 className="text-2xl font-bold">Factura #{invoice.id}</h1>
          <p>
            Cliente: {invoice.client.name} {invoice.client.surname}
          </p>
          <p>
            ID:
            {" " + invoice.client.pid_prefix}-{invoice.client.pid}
          </p>
          <p>Direccion: {"" + invoice.client.dir}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <div>
                <h1 className="text-xl font-bold">Productos</h1>
                <MRT_Table table={productTable} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">Pagos</h1>
              <MRT_Table table={paymentTable} />
            </div>
          </div>
          <div className="flex gap-2 flex-col items-end">
            <div>
              <h1 className="text-md font-bold">
                Subtotal: $
                {invoice.products
                  .reduce((acc, p) => acc + p.price * p.quantity, 0)
                  .toFixed(2)}
              </h1>
            </div>
            <div>
              <h1 className="text-md ">Impuesto (10%): $
                {(
                  invoice.products.reduce(
                    (acc, p) => acc + p.price * p.quantity,
                    0
                  ) * 0.1
                ).toFixed(2)}
              </h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">Total: $
                {(
                  invoice.products.reduce(
                    (acc, p) => acc + p.price * p.quantity,
                    0
                  ) * 1.1
                ).toFixed(2)}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
