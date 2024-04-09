import { BarChart } from "lucide-react"
import Navbar from "../Components/Navbar"

export default function Search() {
    return (
        <>
            <Navbar></Navbar>
            <h1 className="text-3xl">Buscar facturas</h1>

            <BarChart size={64} />
        </>
    )
}