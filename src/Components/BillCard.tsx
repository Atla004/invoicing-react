

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"


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

interface Bank {
  bank: string;
  total: number;
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

interface Result {
  average_invoice: number;
  banks: Bank[];
  date: string;
  day_total: number;
  invoice_quantity: number;
  invoices: Invoice[];
  methods: Method[];
  products: Product[];
}

interface BillCardProps {
  type: number;
  result: Result;
  filterDate?: string;  // Add a new prop for the filter date
}

export default function BillCard({ type, result, filterDate }: BillCardProps) {
  if ((type === 3 || type === 4) && !filterDate) {
    return <div>Error: filterDate is required when type is 3 or 4</div>;
  }

  //filtra data por date
  const invoices = filterDate
    ? result.invoices.filter(invoice => invoice.date === filterDate)
    : result.invoices;

  const totalSum = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const averageInvoice = invoices.reduce((sum, invoice) => sum + invoice.total, 0) / invoices.length;



  let cardContent, cardTitle, cardDescription;

  switch(type) {
    case 1:
      cardContent = "Total";
      cardTitle = ` $${totalSum.toFixed(2)}`;
      cardDescription = "suma de todas las facturas ";
      break;
    case 3:
      cardContent = "Total";
      cardTitle = ` $${totalSum.toFixed(2)}`;
      cardDescription = `suma de todas las facturas del ${filterDate}`;
      break;
    case 2:
      cardContent = "average_invoice";
      cardTitle = ` $${averageInvoice.toFixed(2)}`;
      cardDescription = "promedio de monto por factura";
      break;
    case 4:
      cardContent = "average_invoice";
      cardTitle = ` $${averageInvoice.toFixed(2)}`;
      cardDescription =   `promedio de monto por factura del ${filterDate}`;
      break;
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardContent>{cardContent}</CardContent>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
    </Card>
  )
}