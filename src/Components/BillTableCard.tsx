import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table"  

  interface Bank {
    bank: string;
    total: number;
  }
  
  interface Invoice {
    date: string;
    invoice_id: number;
    name: string;
    pid: string;
    pid_prefix: string;
    surname: string;
    total: number;
    void: boolean;
  }
  
  interface Method {
    method: string;
    total: number;
  }
  
  interface Product {
    name: string;
    sold: number;
    total: number;
  }
  
  interface Data {
    average_invoice: number;
    banks: Bank[];
    closing_time: string;
    date: string;
    day_total: number;
    invoice_quantity: number;
    invoices: Invoice[];
    methods: Method[];
    products: Product[];
  }

  interface BillTableCardProps {
    invoices: Data;
  }


  export default function BillTableCard({ invoices: result }: BillTableCardProps){
    //console.log('invoices', result);

    const invoices =result.invoices


/*
    "date": "2024-04-09",
    "invoice_id": 100,
    "name": "Tomas",
    "pid": "30604530",
    "pid_prefix": "V",
    "surname": "Santana",
    "total": 4.4,
    "void": false
    */


    return(
      <Table className="shadow-lg bg-white">
      <TableCaption className="text-3xl font-bold mt-9 mb-2">Últimas facturas del día</TableCaption>
      <TableHeader className="bg-gray-200 text-black">
        <TableRow>
          <TableHead className="w-[100px] py-4 px-2 text-center"> ID de Factura</TableHead> {/* Align text to the right */}
          <TableHead className="py-4 px-2 text-center">Prefijo de Cédula</TableHead> {/* Align text to the right */}
          <TableHead className="py-4 px-2">Cédula</TableHead>
          <TableHead className="py-4 px-2">Nombre</TableHead>
          <TableHead className="py-4 px-2">Apellido</TableHead>
          <TableHead className="text-center py-4 px-2">Monto Total</TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody className="max-h-[200px] overflow-y-auto">
        {invoices.slice(-5).reverse().map((invoice) => (
          <TableRow key={invoice.name}>
            <TableCell className="font-medium py-4 px-2 text-center">{invoice.invoice_id}</TableCell> {/* Align text to the right */}
            <TableCell className="py-4 px-2 text-center">{invoice.pid_prefix}</TableCell> {/* Align text to the right */}
            <TableCell className="py-4 px-2">{invoice.pid}</TableCell>
            <TableCell className="py-4 px-2">{invoice.name}</TableCell>
            <TableCell className="py-4 px-2">{invoice.surname}</TableCell>
    
            <TableCell className="text-center py-4 px-2">${invoice.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    
      <TableFooter className="bg-blue-500 text-white">
        <TableRow>
          <TableCell colSpan={5} className="py-4 px-2">Total Final Diario</TableCell>
          <TableCell className="text-center py-4 px-2">${result.day_total.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    
    </Table>
    ) 

  }