import * as React from "react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"


const data = [
  {
    goal: 500,
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
    <Card className="w-[350px]">
    <div className="mt-3 h-[120px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <Bar
            dataKey="goal"
            style={
              {
                fill: "hsl(var(--foreground))",
                opacity: 0.9,
              } as React.CSSProperties
            }
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </Card>
  )
}
