import BillDate from "../Components/BillDate"
import Navbar from "../Components/Navbar"
import ActionAlertProg from "@/Components/Alerts/ActionAlertProg";

export default function Search() {
    return (
        <>
            <Navbar></Navbar>
            <h1 className="text-3xl">Buscar facturas</h1>
          
            <BillDate></BillDate>
        </>
    )
}