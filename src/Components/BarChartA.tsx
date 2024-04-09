import * as React from "react"
import { Bar, BarChart, ResponsiveContainer,YAxis,Tooltip } from "recharts"
import {Card} from "@/Components/ui/card"


const data = [
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export default function BarChartA() {
  return (
    <Card>
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
        <BarChart data={data}>
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="goal"
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
