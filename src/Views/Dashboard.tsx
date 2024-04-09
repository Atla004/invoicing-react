import { useEffect, useState, Suspense } from "react";
import BarChartA from "../Components/BarChartA"
import Navbar from "../Components/Navbar"
import TableCard from "@/Components/TableCard";
import BillCard from "../Components/BillCard"
import { Button } from "@/Components/ui/button";


type HelloResponse = {
    message: string;
}

export default function Dashboard() {
    const [message, setMessage] = useState<HelloResponse>({message: ""});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:5000/hello");
            const data = await response.json();
            setMessage(data);
        }
        fetchData();
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className="p-2 w-full bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
                <h1 className="text-3xl">Dashboard</h1>
                <Suspense fallback={<p>Cargando...</p>}>
                    {message.message && <p>{message.message}</p>}
                </Suspense>

                <div className="content p-2 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
                    <div className="col-span-1 md:row-span-1">
                        <BillCard></BillCard>
                    </div>
                    <div className="col-span-2 md:col-span-2 md:row-span-2 flex items-center justify-center">
                        <Button>Cerrar Caja</Button>
                    </div>
                    <div className="col-span-2 md:col-span-2 md:row-span-2 flex items-center justify-center">
                        <BarChartA></BarChartA>
                    </div>
                    <div className="col-span-2 md:row-span-2">
                        <TableCard></TableCard>
                    </div>
                </div>
            </div>
        </>
    )
}