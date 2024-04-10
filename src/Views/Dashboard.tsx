import { useEffect, useState, /*Suspense*/ } from "react";
import BarChartA from "../Components/BarChartA";
import BillDate from "../Components/BillDate";
import Navbar from "../Components/Navbar";
import TableCard from "@/Components/TableCard";
import BillCard from "../Components/BillCard";
import ActionAlertProg from "@/Components/Alerts/ActionAlertProg";
import { useKeyCombination } from "@/hooks";

type HelloResponse = {
    message: string;
}

const invoices = [
    {
      invoice: "INV001",
      Banco: "BNC",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      Banco: "Banesco",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      Banco: "Banesco",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      Banco: "BNC",
      totalAmount: "$430.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      Banco: "BNC",
      totalAmount: "$120.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      Banco: "BNC",
      totalAmount: "$100.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      Banco: "Venezuela",
      totalAmount: "$200.00",
      paymentMethod: "Credit Card",
    },
  ]

const factura ={
"result": {
    "average_invoice": 54.63333333333333,
    "banks": [
        {
            "bank": "CHASE",
            "total": 22
        },
        {
            "bank": "VENEZUELA",
            "total": 137.5
        },
        {
            "bank": "EFECTIVO",
            "total": 4.4
        }
    ],
    "date": "2024-04-09",
    "day_total": 163.9,
    "invoice_quantity": 3,
    "invoices": [
        {
            "date": "2024-04-09",
            "invoice_id": 6,
            "name": "Tomas",
            "pid": "30604530",
            "pid_prefix": "V",
            "surname": "Santana",
            "total": 22,
            "void": false
        },
        {
            "date": "2024-04-09",
            "invoice_id": 8,
            "name": "Simon",
            "pid": "1",
            "pid_prefix": "V",
            "surname": "Bolivar",
            "total": 137.5,
            "void": false
        },
        {
            "date": "2024-04-09",
            "invoice_id": 100,
            "name": "Tomas",
            "pid": "30604530",
            "pid_prefix": "V",
            "surname": "Santana",
            "total": 4.4,
            "void": false
        }
    ],
    "methods": [
        {
            "method": "EFECTIVO",
            "total": 4.4
        },
        {
            "method": "TARJETA DE DEBITO",
            "total": 137.5
        },
        {
            "method": "ZELLE",
            "total": 22
        }
    ],
    "products": [
        {
            "name": "LAMPARA",
            "sold": 5,
            "total": 125
        },
        {
            "name": "TENEDOR",
            "sold": 12,
            "total": 24
        }
    ]
}
}

export default function Dashboard() {
    const [message, setMessage] = useState<HelloResponse>({message: ""});
    //const [isLoading, setIsLoading] = useState<boolean>(true);
    const [openCerrarCaja, setCerrarCaja] = useState(false);
    const [filterDate, setFilterDate] = useState('2024-04-09');
    console.log(filterDate);
    useEffect(() => {
        const fetchData = async () => {
            //setIsLoading(true);
            const response = await fetch("http://127.0.0.1:5000/hello");
            const data = await response.json();
            setMessage(data);
            //setIsLoading(false);
          
        }
        fetchData();
    }, [])

    useKeyCombination(() => {
        setCerrarCaja(true);
      }, ["ctrl", "alt", "c"]);

    const cerrarCaja = () => {
        console.log('El usuario hizo clic en el botón de acción');
    };


    /* //SOLO CARGA CON EL BACKEND ABIERTO
    if (isLoading) {
        return <p>Cargando...</p>;
    }
    */

    return (
        <>
            <Navbar></Navbar> 
            <div className="p-2 w-full bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
                <h1 className="text-3xl">Dashboard</h1>
                {message.message && <p>{message.message}</p>}

                <div className="content p-2 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                <BillDate setFilterDate={setFilterDate} filterDate={filterDate}></BillDate>

                    <div className="col-span-1 md:row-span-1">
                        <BillCard type = {1} result={factura.result}></BillCard>
                        <BillCard type = {2} result={factura.result}></BillCard>
                        <BillCard type = {3} result={factura.result} filterDate={filterDate}></BillCard>
                    </div>
                    <div className="col-span-2 md:col-span-2 md:row-span-2 flex items-center justify-center">
                        <ActionAlertProg
                            title="¿Estás seguro?"
                            action={cerrarCaja}
                            description="Estas seguro que quieres cerar caja el dia de hoy"
                            button="Cerrar Caja"
                            buttonColor="red"
                            open={openCerrarCaja}
                            setOpen={setCerrarCaja}
                        />
                    </div>
                    <div className="col-span-2 md:col-span-2 md:row-span-2 flex items-center justify-center">
                        <BarChartA type={1} invoices={invoices}></BarChartA>
                        <BarChartA type={2} invoices={invoices}></BarChartA>
                        <BarChartA type={3} invoices={invoices}></BarChartA>
                    </div>
                    <div className="col-span-2 md:row-span-2">
                        <TableCard invoices={invoices}></TableCard>
                    </div>
                </div>
            </div>
            <div className="w-56">

            </div>
        </>
    )
}