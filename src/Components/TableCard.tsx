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



  interface Invoice {
    invoice: string;
    Banco: string;
    paymentMethod: string;
    totalAmount: string;
  }
  
  interface TableCardProps {
    invoices: Invoice[];
  }


  export default function TableCard({ invoices }: TableCardProps){
    const [totalSum, setTotalSum] = useState(0);
  
    useEffect(() => {
      const sum = invoices.reduce((sum, invoice) => {
        const totalAmountNumber = parseFloat(invoice.totalAmount.replace("$", ""));
        return sum + totalAmountNumber;
      }, 0);
  
      setTotalSum(sum);
    }, [invoices]);

    
    return(
      <Table>
      <TableCaption>A list of the last 5 invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Banco</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody className="max-h-[200px] overflow-y-auto">
        {invoices.slice(-5).reverse().map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.Banco}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
 
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${totalSum.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>

    </Table>
    ) 
  }