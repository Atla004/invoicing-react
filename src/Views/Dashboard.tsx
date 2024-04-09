import { useEffect, useState, Suspense } from "react";
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

export default function Dashboard() {
    const [message, setMessage] = useState<HelloResponse>({message: ""});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [openCerrarCaja, setCerrarCaja] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:5000/hello");
            const data = await response.json();
            setMessage(data);
            setIsLoading(false);
          
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
                    <div className="col-span-1 md:row-span-1">
                        <BillDate></BillDate>
                    </div>
                    <div className="col-span-1 md:row-span-1">
                        <BillCard></BillCard>
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
                        <BarChartA></BarChartA>
                    </div>
                    <div className="col-span-2 md:row-span-2">
                        <TableCard></TableCard>
                    </div>
                </div>
            </div>
            <div className="w-56">

            </div>
        </>
    )
}