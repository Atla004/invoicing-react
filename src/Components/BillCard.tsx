

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
  type: "total" | "average";
  result: Result;
  filterDate?: string;  // Add a new prop for the filter date
}

export default function BillCard({ type, result }: BillCardProps) {



  const totalSum = result.day_total;
  const averageInvoice = result.average_invoice;



  let cardContent, cardTitle, cardDescription;

  switch(type) {
    case "total":
      cardContent = "Total";
      cardTitle = ` $${totalSum.toFixed(2)}`;
      cardDescription = "suma de todas las facturas ";
      break;
    case "average":
      cardContent = "average_invoice";
      cardTitle = ` $${averageInvoice.toFixed(2)}`;
      cardDescription = "promedio de monto por factura";
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