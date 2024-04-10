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
    console.log('invoices', result);

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
      <Table>
      <TableCaption>A list of the last 5 invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"> invoice_id</TableHead>
          <TableHead>pid_prefix</TableHead>
          <TableHead>pid</TableHead>
          <TableHead>name</TableHead>
          <TableHead>surname</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody className="max-h-[200px] overflow-y-auto">
        {invoices.slice(-5).reverse().map((invoice) => (
          <TableRow key={invoice.name}>
            <TableCell className="font-medium">{invoice.invoice_id}</TableCell>
            <TableCell>{invoice.pid_prefix}</TableCell>
            <TableCell>{invoice.pid}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.surname}</TableCell>

            <TableCell className="text-right">{invoice.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
 
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{result.day_total}</TableCell>
        </TableRow>
      </TableFooter>

    </Table>
    ) 

  }