import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Button } from '@/Components/ui/button';
import {
    useMaterialReactTable,
    MaterialReactTable,
    type MRT_ColumnDef,
} from "material-react-table";
import ProductTable from "../Components/SearchProductTable";
import PaymentTable from "../Components/SearchPaymentTable";
import { ProductEntry } from 'src/Views/Invoicing.tsx';
import { Payment } from 'src/Views/Invoicing.tsx';
import { set } from 'date-fns';

// Estilos para los elementos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
interface Payment {
  amount: number;
  bank: string;
  method: string;
}

interface Product {
  code: string;
  name: string;
  photourl: string;
  price: number;
  quantity: number;
}

interface Client {
  dir: string;
  name: string;
  pid: string;
  pid_prefix: string;
  surname: string;
}

interface Factura {
  result: {
    client: Client;
    date: string;
    invoice_id: number;
    payments: Payment[];
    products: Product[];
    void: boolean;
  } ;
}

interface SearchFacturaModalProps {
  id: Number;
}


export default function SearchFacturaModal({id}: SearchFacturaModalProps) {
  const [factura, setFactura] = useState<Factura>({
result: {
  client: {
    dir: "",
    name: "",
    pid: "",
    pid_prefix: "",
    surname: "",
  },
  date: "",
  invoice_id: 0,
  payments: [],
  products: [],
  void: false,
}
}
  );

  const fetchData = async () => {
    const body ={
    "invoice_id": id
  }
  const response = await fetch("http://127.0.0.1:5000/getInvoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
  });
    const data = await response.json();
    console.log(data);
    setFactura(data);
    
}

useEffect(() => {
  fetchData();
  
}, []);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

/* const [payments, setPayments] = useState<Payment[]>();
const [products, setProducts] = useState<ProductEntry[]>(); */

const totals = {
  left: 500, // Este valor debe calcularse en base a tus productos
};

  return (
    <div>
      <Button onClick={openModal}>Ver</Button>
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <Container>
          <h2>Factura {id}</h2>
          <p>Nombre: {factura.result.client.name}</p>
          <p>pid: {factura.result.client.pid}</p>
          <div>
            <PaymentTable 
                    payments={factura.result.payments}
                    setPayments={setFactura}
                    amountLeft={totals.left}
                                />
          </div>
          <div>
            <ProductTable
                                products={factura.result.products}
                                setProducts={setFactura}
                                amountLeft={totals.left}
             />

            
          </div>  
          <div>

    
          </div>

        </Container>
      </Modal>
    </div>
  );
}
