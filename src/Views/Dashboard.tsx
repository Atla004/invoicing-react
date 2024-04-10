import { useEffect, useState, /*Suspense*/ } from "react";
import BarChartA from "../Components/BarChartA";
import BillDate from "../Components/BillDate";
import Navbar from "../Components/Navbar";
import BillCard from "../Components/BillCard";
import ActionAlertProg from "@/Components/Alerts/ActionAlertProg";
import { useKeyCombination } from "@/hooks";
import BillTableCard from "@/Components/BillTableCard";
import { toast } from "sonner";
import moment from 'moment';
import { set } from "date-fns";

type HelloResponse = {
    message: string;
}



type ClosingStatement = {
    average_invoice: number | "";
    banks: { bank: string, total: number }[];
    date: string;
    day_total: number;
    invoice_quantity: number
    invoices: { date: string, invoice_id: number, name: string, pid: string, pid_prefix: string, surname: string, total: number, void: boolean }[];
    methods: { method: string, total: number }[];
    products: { name: string, sold: number, total: number }[];
    closing_time: string;
}


export default function Dashboard() {
    const [message, setMessage] = useState<HelloResponse>({message: ""});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [openCerrarCaja, setCerrarCaja] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]); // fecha de la factura
    const [closingStatement, setClosingStatement] = useState<ClosingStatement>({
        average_invoice: "",
        banks: [],
        date: "",
        day_total: 0,
        invoice_quantity: 0,
        invoices: [],
        methods: [],
        products: [],
        closing_time: "",
    
    }); // array de los datos de cierre de caja
    const [maxDate, setMaxDate] = useState(filterDate);
    const [closemessage, setClosemessage] = useState("Cerrar Caja");

    useEffect(() => {
      setMaxDate(filterDate);
    }, []);



    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const body = {
                date: filterDate
            };
            const response = await fetch("http://127.0.0.1:5000/getClosingStatement", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            setClosingStatement(data.result);
            setIsLoading(false);
           if(data.result.closing_time === "" && maxDate === filterDate){
            console.log("Caja Abierta");
            setClosemessage("Cerrar Caja");
           }else{
            setClosemessage("Caja Cerrada");
           }
           //console.log(closemessage);
           //console.log(closingStatement.closing_time);

        }
        fetchData();
    }, [filterDate]);



    useKeyCombination(() => {
        setCerrarCaja(true);
    }, ["ctrl", "alt", "c"]);

    const cerrarCaja = async () => {
        if (closingStatement.closing_time === "") {
          // Assign the current time to closing_time
          const response = await fetch("http://127.0.0.1:5000/close", {
            method: "POST",
          })
          setClosemessage("Caja Cerrada");
          if (response.ok) {
            toast.success("Caja cerrada con éxito");
            setClosingStatement((prev) => {
                return {
                    ...prev,
                    closing_time: new Date().toISOString(),
                };
                });
          }
        } else {
          const today = moment().format('YYYY-MM-DD');
          const closingDate = moment(closingStatement.date).format('YYYY-MM-DD');

            
          if (closingDate === today) {
            toast.error("La caja ya ha sido cerrada");
          } else {
            toast.error("No puedes cerrar la caja de otros días");
          }
        }
    };



     //SOLO CARGA CON EL BACKEND ABIERTO
    if (isLoading) {
        return <p>Cargando...</p>;
    }



    return (
        <>
        
            <Navbar></Navbar> 
                    <div className="fixed top-10 right-10 m-4">
                        <ActionAlertProg
                            title="¿Estás seguro?"
                            action={cerrarCaja}
                            description="Estas seguro que quieres cerar caja el dia de hoy"
                            button={closemessage}
                            buttonColor={closemessage === "Caja Cerrada" ? "red" : "green"}
                            open={openCerrarCaja}
                            setOpen={setCerrarCaja}
                        />
                    </div>
            <div>

            </div>
            <div className="p-8 w-full bg-gradient-to-tr from-sky-400 via-indigo-600 to-blue-700">
            <BillDate setFilterDate={setFilterDate} filterDate={filterDate} maxDate = {maxDate}></BillDate>
                <h1 className="text-3xl">Dashboard</h1>
                {message.message && <p>{message.message}</p>}

                <div className="content p-2 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">

                    <div className="col-span-1 md:row-span-1">
                        <BillCard type="total" result={closingStatement}  />
                        <BillCard type="average" result={closingStatement}  />
                    </div>
                    <div className="col-span-2 md:col-span-2 md:row-span-2 flex items-center justify-center">
                        <BarChartA type="total" invoices={closingStatement.banks} />
                        <BarChartA type="total" invoices={closingStatement.methods} />
                        <BarChartA type="total" invoices={closingStatement.products} />
                        <BarChartA type="sold" invoices={closingStatement.products} />

                    </div>
                    <div className="col-span-2 md:row-span-2">
                        <BillTableCard invoices={closingStatement} />
             
                    </div>
                </div>
            </div>
            <div className="w-56">

            </div>
        </>
    )
}