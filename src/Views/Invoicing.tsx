import Navbar from "../Components/Navbar";
import ClientInput from "../Components/ClientInput";
import ProductInput from "../Components/ProductInput";
import PaymentInput from "../Components/PaymentInput";
import ProductTable from "../Components/ProductTable";
import PaymentTable from "../Components/PaymentTable";
import { useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useKeyCombination } from "@/hooks";
import { useAtom } from "jotai";
import ActionAlertProg from "@/Components/Alerts/ActionAlertProg";
import FullInvoice from "@/Components/FullInvoice";
import { toast } from "sonner";
import { invoiceStateAtom } from "@/Atoms/atoms";

export type Payment = {
  method: string;
  bank?: string;
  amount: number;
};

export type ProductEntry = {
  name: string;
  code: string;
  photourl: string;
  price: number;
  quantity: number;
};

export type Client = {
  name: string;
  surname: string;
  pid_prefix: string;
  pid: string;
  dir: string;
};

export type Invoice = {
  id: string;
  client: Client;
  products: ProductEntry[];
  payments: Payment[];
};


export default function Invoicing() {
  const [client, setClient] = useState<Client>({
    name: "",
    surname: "",
    pid_prefix: "V",
    pid: "",
    dir: "",
  });
  const [products, setProducts] = useState<ProductEntry[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoiceId, _] = useState(
    "00000000" +
      Math.floor(Math.random() * 1000000)
        .toString()
        .slice(-6) +
      "V" +
      client.pid
  );

  const [invoiceState, setInvoiceState] = useAtom(invoiceStateAtom);
  const invoiceStateMap = {
    draft: "Borrador",
    finalized: "Finalizada",
    cancelled: "Anulada",
  };

  const [facturarDialogState, setFacturarDialogState] = useState(false);
  const [anularFacturaDialogState, setAnularFacturaDialogState] =
    useState(false);

  const [activeTab, setActiveTab] = useState("productos");
  const tabs = ["productos", "pagos"];

  useKeyCombination(() => {
    setFacturarDialogState(true);
  }, ["ctrl", "alt", "d"]);

  useKeyCombination(() => {
    // anular factura
    setAnularFacturaDialogState(true);
  }, ["ctrl", "alt", "r"]);

  useKeyCombination(() => {
    const index = tabs.indexOf(activeTab);
    setActiveTab(tabs[(index + 1) % tabs.length]);
  }, ["ctrl", "alt", "t"]);

  const addProduct = (product: ProductEntry) => {
    const index = products.findIndex((p) => p.code === product.code);
    if (index !== -1) {
      const newProducts = [...products];
      newProducts[index].quantity += product.quantity;
      setProducts(newProducts);
    } else {
      setProducts([...products, product]);
    }
    console.log(products);
  };

  const addPayment = (payment: Payment) => {
    setPayments([...payments, payment]);
  };

  const totals = useMemo(() => {
    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const total = subtotal * 1.1;
    const paid = payments.reduce((acc, p) => acc + p.amount, 0);
    const left = total - paid;
    return {
      subtotal,
      total,
      paid,
      left,
    };
  }, [products, payments]);

  const amountLeftRef = useRef(totals.left);
  const facturar = () => {
    console.log(amountLeftRef.current);
    console.log(totals.left)
    if (invoiceState === "finalized") {
      toast.error("Factura ya finalizada");
      return;
    }
    else if (invoiceState === "cancelled") {
      toast.error("Factura anulada");
      return;
    }
    
    else if (amountLeftRef.current > 0) {
      toast.error("Falta pagar la factura");
      return;
    }
    else if (products.length === 0) {
      toast.error("No hay productos en la factura");
      return;
    }
    else if (payments.length === 0) {
      toast.error("No hay pagos en la factura");
      return;
    }
    else if (client.name === "" || client.surname === "" || client.pid === "" || client.dir === "") {
      toast.error("Falta información del cliente");
      return;
    }
    setFacturarDialogState(false);
    setInvoiceState("finalized");
    window.print();
  };

  const anularFactura = () => {
    if (invoiceState === "cancelled") {
      alert("Factura ya anulada");
      return;
    }
    alert("Factura anulada");
    setInvoiceState("cancelled");
  };



  return (
    <>
      <div className="nonprint">
        <Navbar></Navbar>
        <div className="p-2 w-full bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
          <Tabs
            defaultValue="productos"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col justify-center items-center"
          >
            <TabsList className="max-w-fit">
              <TabsTrigger value="productos">Productos</TabsTrigger>
              <TabsTrigger value="pagos">Pagos</TabsTrigger>
            </TabsList>
            <TabsContent value="productos">
              <div className="content p-2 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                <div className="col-span-1 md:row-span-1">
                  <ProductInput addEntry={addProduct} />
                </div>
                <div className="col-span-1 md:col-span-2 md:row-span-2">
                  <ProductTable
                    products={products}
                    setProducts={setProducts}
                    amountLeft={totals.left}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="pagos">
              <div className="content p-2 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                <div className="col-span-1 md:row-span-1">
                  <ClientInput clientInfo={client} setClientInfo={setClient} />
                </div>
                <div className="col-span-1 md:col-span-2 md:row-span-2">
                  <PaymentTable
                    payments={payments}
                    setPayments={setPayments}
                    amountLeft={totals.left}
                  />
                </div>
                <div className="col-span-1 md:row-span-1">
                  <PaymentInput
                    addPayment={addPayment}
                    amountLeft={totals.left}
                  />
                </div>
              </div>
              {/* boton de facturar */}
              <div className="w-full flex flex-col md:flex-row gap-4 pl-4 items-center">
                <div className="w-56">
                  <ActionAlertProg
                    title="¿Estás seguro?"
                    action={facturar}
                    description="Estás a punto de finalizar la factura. No podrás modificarla después. ¿Estás seguro de que deseas continuar?"
                    button="Facturar"
                    buttonColor="green"
                    open={facturarDialogState}
                    setOpen={setFacturarDialogState}
                  />
                </div>
                <div className="w-56">
                  <ActionAlertProg
                    title="¿Estás seguro?"
                    action={anularFactura}
                    description="Estás a punto de anular la factura. Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?"
                    button="Anular Factura"
                    buttonColor="red"
                    open={anularFacturaDialogState}
                    setOpen={setAnularFacturaDialogState}
                  />
                </div>
                <p className="text-white font-bold text-xl">
                  Estado de la factura: {invoiceStateMap[invoiceState]}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="print">
        <FullInvoice
          invoice={{
            id: invoiceId,
            client,
            products,
            payments,
          }}
        ></FullInvoice>
      </div>

    </>
  );
}
