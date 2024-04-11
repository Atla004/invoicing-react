

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
      cardContent = "Ganancia Total Diaria";
      cardTitle = ` $${totalSum.toFixed(2)}`;
      cardDescription = "Sumatoria de todas las facturas del día.";
      break;
    case "average":
      cardContent = "Promedio Individual";
      cardTitle = ` $${averageInvoice.toFixed(2)}`;
      cardDescription = "Montos totales por factura del día promediados.";
      break;
  }

  return (
    <Card className="flex flex-col items-center p-4 m-2">
      <CardHeader className="text-center items-center -mt-2">  {/* Add negative top margin here */}
        <CardContent className="font-bold font text-2xl -mt-3 mb-3">{cardContent}</CardContent>
      </CardHeader>
      <CardTitle className="font-bold text-6xl -mt-8 mb-7">{cardTitle}</CardTitle>  {/* Increase negative top margin here */}
      <CardDescription className="mt-4 font-semibold text-center">{cardDescription}</CardDescription>
    </Card>
  )
}