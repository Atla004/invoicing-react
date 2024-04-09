

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"


export default function BillCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardContent>Total(+Factura)</CardContent>
        <CardTitle>$300 </CardTitle>
        <CardDescription>20% form last moth</CardDescription>
      </CardHeader>
    </Card>
  )
}
