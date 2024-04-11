import { Payment, ProductEntry } from "@/Views/Invoicing";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ActionAlertProg from "@/Components/Alerts/ActionAlertProg";

import {
  MRT_Table,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useParams } from "react-router-dom";

type FullInvoice = {
  invoice_id: number,
  date: string,
  client: {
    name: string,
    surname: string,
    pid: string,
    pid_prefix: string,
    dir: string,
  },
  products: ProductEntry[],
  payments: Payment[],
  void: boolean,
}

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

export default function FullInvoice() {
  const [invoice, setInvoice] = useState<FullInvoice>({
    invoice_id: 0,
    date: "",
    client: {
      name: "",
      surname: "",
      pid: "",
      pid_prefix: "",
      dir: "",
    },
    products: [],
    payments: [],
    void: false,
  });

  const [anularFacturaDialogState, setAnularFacturaDialogState] = useState(false);

  const { invoiceId } = useParams<{ invoiceId: string }>();

  useEffect(() => {
    async function fetchInvoice() {
      const body = {
        invoice_id: invoiceId,
      
      }
      const response = await fetch(`http://127.0.0.1:5000/getInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      type Response = {
        "result": FullInvoice
      }
      const data: Response = await response.json();
      setInvoice(data.result);
      console.log(data.result);
    }
    fetchInvoice();
  }, [invoiceId]);

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

  const handleVoid = async () => {
    const body = {
      invoice_id: invoice.invoice_id,
    };
    const response = await fetch('http://127.0.0.1:5000/voidInvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      toast.success('Factura anulada');
      setInvoice({ ...invoice, void: true });
    } else {
      toast.error('Error al anular factura');
    }
  }

  return (
    <div className=" grid place-items-center">
      <div className="max-w-6xl w-full mt-10">
        <div id="header" className="bg-white rounded p-4 flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Factura #{invoice.invoice_id}</h1>
            <div>
              <p className="text-lg">Fecha: <span className="font-bold">{invoice.date}</span></p>
              <p className="text-lg">Estado: <span className="font-bold">{invoice.void ? "Anulada" : "Vigente"}</span></p>
            </div>
          </div>
          <p className="text-lg">
            Cliente: <span className="font-bold">{invoice.client.name} {invoice.client.surname}</span> 
          </p>
          <p className="text-lg">
            ID:
            <span className="font-bold">{" " + invoice.client.pid_prefix}-{invoice.client.pid}</span>
          </p>
          <p>Direccion: <span className="font-bold">{"" + invoice.client.dir}</span></p>
        </div>
        <div className="w-full max-w-6xl mt-4 mx-auto flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-white rounded-md p-4">
            <h3 className="text-xl font-bold">Productos</h3>
            <MRT_Table table={productTable} />
          </div>
          <div className="flex-1 bg-white rounded-md p-4">
            <h3 className="text-xl font-bold">Pagos</h3>
            <MRT_Table table={paymentTable} />
          </div>
        </div>
        <div className="w-full max-w-6xl mt-4 mx-auto flex justify-between rounded-md bg-white p-4">
          <h3 className="text-3xl font-bold">Totales</h3>
          <div className="flex flex-col gap-1 items-end">
            <div>
              <h3 className="text-md font-bold">
                Subtotal: $
                {invoice.products
                  .reduce((acc, p) => acc + p.price * p.quantity, 0)
                  .toFixed(2)}
              </h3>
            </div>
            <div>
              <h3 className="text-md ">Impuesto (10%): $
                {(
                  invoice.products.reduce(
                    (acc, p) => acc + p.price * p.quantity,
                    0
                  ) * 0.1
                ).toFixed(2)}
              </h3>
            </div>
            <div>
              <h3 className="text-xl font-bold">Total: $
                {(
                  invoice.products.reduce(
                    (acc, p) => acc + p.price * p.quantity,
                    0
                  ) * 1.1
                ).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="w-full max-w-6xl mt-4">
          <div className="w-56">

            <ActionAlertProg 
              title="¿Estás seguro?"
              action={handleVoid}
              description="Estás a punto de anular la factura. Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
              button="Anular Factura"
              buttonColor="red"
              open={anularFacturaDialogState}
              setOpen={setAnularFacturaDialogState}
              disabled={invoice.void}
            />
          </div>

        </div>
      </div>
      <div className="fixed -z-20 inset-0 bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700"></div>
    </div>
  );
}
