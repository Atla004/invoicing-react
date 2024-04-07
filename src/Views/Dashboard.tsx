import { useEffect, useState, Suspense } from "react";
import Navbar from "../Components/Navbar"
import { useKeyCombination } from "../hooks";
import HelpDialog from "@/Components/HelpDialog";

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
            
        </>
    )
}