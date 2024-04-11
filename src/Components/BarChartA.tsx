import * as React from "react"
import { Bar, BarChart, ResponsiveContainer,YAxis,XAxis,Tooltip } from "recharts"
import {Card} from "@/Components/ui/card"
import { Label } from 'recharts';



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
  title?: string;
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
  <Card className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-xl font-bold mb-4 text-blue-500">{title}</h2>
    <div className="w-full h-100 bg-gray-100 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%" minWidth={250} minHeight={250}>
      <BarChart data={data} margin={{ left: -19 }}>
  <Label value={title} offset={0} position="top" style={{fontSize: '24px', fontFamily: 'Segoe UI Black'}} />
  <YAxis 
    domain={[0, 'auto']} 
    tickFormatter={(tick) => type === 'sold' ? tick : `$${tick}`} 
    tick={{ fontSize: 14, fontFamily: 'Segoe UI Black' }}
  />
  <XAxis 
    dataKey="X" 
    tick={{ fontSize: 11.5, fontFamily: 'Segoe UI Black' }}
  />
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
);
}