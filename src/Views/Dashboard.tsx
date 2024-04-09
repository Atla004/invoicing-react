import { useEffect, useState, Suspense } from "react";
import BarChartA from "../Components/BarChartA"
import Navbar from "../Components/Navbar"
import TableCard from "@/Components/TableCard";
import BillCard from "../Components/BillCard"

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
        <h1 className="text-3xl">Dashboard</h1>
        <Suspense fallback={<p>Cargando...</p>}>
            {message.message && <p>{message.message}</p>}
        </Suspense>

        <div 
        className="items-center justify-center w-full h-[800px]"
        >
            <div className="flex">
                <BillCard></BillCard>
            </div>
            <div className="flex">
                <BarChartA></BarChartA>
                <TableCard></TableCard>
            </div>
        </div>
                
    </>
    )
}