

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
}

export default function BillCard({ type, result }: BillCardProps) {
  const totalSum = result.invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardContent>{type === 2 ? "average_invoice" :"Total"}</CardContent>
          <CardTitle>
            {type === 2 ? ` $${result.average_invoice.toFixed(2)}` : ` $${totalSum.toFixed(2)}` }
          </CardTitle>
        <CardDescription>{type === 2 ?  "promedio de monto por factura" :"suma de todas las facturas"}</CardDescription>
      </CardHeader>
    </Card>
  )
}
