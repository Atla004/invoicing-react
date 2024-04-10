import * as React from "react"
import { Bar, BarChart, ResponsiveContainer,YAxis,XAxis,Tooltip } from "recharts"
import {Card} from "@/Components/ui/card"
import { title } from "process";



interface BarXY {
  X: "bank" | "method" | "name";
  Y: number;
}

interface Invoice {
  name: "bank" | "method" | "name"; 
  total: number;
  count?: number;
}

interface BarChartAProps {
  invoices: Invoice[];
  type?: "sold" | "total" ;
}

export default function BarChartA({invoices, type }: BarChartAProps) {
  


const data = invoices.map(invoice => ({
  X: invoice.bank || invoice.method || invoice.name,
  Y: type? invoice[type] : invoice.total,
}));


let title;
if (name === 'banks') {
  title = 'Total por Banco';
} else if (name === 'method') {
  title = 'Toal por Metodo de Pago';
} else if (name === 'products' && type === 'total') {
  title = '  Total por Producto';
} else if (name === 'products' && type === 'sold') {
  title = 'Productos Vendidos';
}

return (
  <Card>
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
        <BarChart data={data}>
          <YAxis domain={[0, 'auto']} tickFormatter={(tick) => type === 'sold' ? tick : `$${tick}`} />
          <XAxis dataKey="X" />
          <Tooltip />

          <Bar
            dataKey="Y"
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