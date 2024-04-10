import * as React from "react"
import { Bar, BarChart, ResponsiveContainer,YAxis,XAxis,Tooltip } from "recharts"
import {Card} from "@/Components/ui/card"



interface BarXY {
  X: string;
  totalAmount: number;
}

interface Invoice {
  invoice: string;
  Banco: string;
  totalAmount: string;
  paymentMethod: string;
}

interface BarChartAProps {
  type: number;
  invoices: Invoice[];
}

export default function BarChartA({ type, invoices }: BarChartAProps) {

console.log(invoices)

  
let field;
let title;
switch (type) {
  case 1:
    field = 'Banco';
    title = 'Monto por Banco';
    break;
  case 2:
    field = 'paymentMethod';
    title = 'Monto por Metodo de Pago';
    break;
  case 3:
    field = 'invoice';
    title = 'Monto por Factura';
    break;
  default:
    throw new Error(`Invalid type: ${type}`);
}

const data = invoices.reduce<BarXY[]>((acc, invoice) => {
  const amount = Number(invoice.totalAmount.replace('$', ''));

  const index = acc.findIndex((item: BarXY) => item.X === invoice[field as keyof typeof invoice]);

  if (index !== -1) {
    // Update existing item
    return [
      ...acc.slice(0, index),
      { X: invoice[field as keyof typeof invoice], totalAmount: acc[index].totalAmount + amount },
      ...acc.slice(index + 1),
    ];
  } else {
    // Add new item
    return [...acc, { X: invoice[field as keyof typeof invoice], totalAmount: amount }];
  }
}, []);

const maxAmount = Math.max(...data.map(item => item.totalAmount));

return (
  <Card>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
        <BarChart data={data}>
          <YAxis domain={[0, maxAmount]} tickFormatter={(tick) => `$${tick}`} />
          <XAxis dataKey="X" />
          <Tooltip />

          <Bar
            dataKey="totalAmount"
            name="Total Amount"
            style={
              {
                fill: "hsl(var(--foreground))",
                opacity: 0.9,
              } as React.CSSProperties
            }
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </Card>
)
}