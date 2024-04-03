import Navbar from "../Components/Navbar";
import ClientInput from "../Components/ClientInput";
import ProductInput from "../Components/ProductInput";
import PaymentInput from "../Components/PaymentInput";
import ProductTable from "../Components/ProductTable";
import PaymentTable from "../Components/PaymentTable";
import { useMemo, useState } from "react";

export type Payment = {
  method: string;
  bank?: string;
  amount: number;
};

export type ProductEntry = {
  name: string;
  code: string;
  photoUrl: string;
  price: number;
  quantity: number;
};

export type Client = {
  name: string;
  id: string;
  dir: string;
};

export type Invoice = {
  client: Client;
  products: ProductEntry[];
};

export default function Invoicing() {
  const [client, setClient] = useState<Client>({ name: "", id: "", dir: "" });
  const [products, setProducts] = useState<ProductEntry[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const addProduct = (product: ProductEntry) => {
    const index = products.findIndex((p) => p.code === product.code);
    if (index !== -1) {
      const newProducts = [...products];
      newProducts[index].quantity += product.quantity;
      setProducts(newProducts);
    } else {
      setProducts([...products, product]);
    }
  };

  const addPayment = (payment: Payment) => {
    setPayments([...payments, payment]);
  };

  const totals = useMemo(() => {
    const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const total = subtotal * 1.1;
    const left = total - payments.reduce((acc, p) => acc + p.amount, 0);
    return {
      subtotal,
      total,
      left,
    };
  }, [products, payments]);

  return (
    <>
      <Navbar></Navbar>
      <div className="p-4 w-full h-full bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
        <h1 className="text-3xl font-bold text-white">Nueva Factura</h1>
        <div className="content p-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <ClientInput clientInfo={client} setClientInfo={setClient} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <ProductInput addEntry={addProduct} />
          </div>
          <div className="col-span-1 md:col-span-3">
            <ProductTable products={products} setProducts={setProducts} />
          </div>
          <div className="col-span-1">
            <PaymentInput addPayment={addPayment} amountLeft={totals.left} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <PaymentTable
              payments={payments}
              setPayments={setPayments}
              amountLeft={totals.left}
            />
          </div>
        </div>
      </div>
    </>
  );
}
