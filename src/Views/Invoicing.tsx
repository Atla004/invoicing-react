import Navbar from "../Components/Navbar"
import ClientInput from "../Components/ClientInput"

export default function Invoicing() {
    return (
        <>
            <Navbar></Navbar>
            <h1 className="text-3xl font-bold">Facturar</h1>
            <div className="content p-2 grid grid-cols-3 gap-4">
                <div className=" col-span-1">
                    <ClientInput />
                </div>
                <div className=" col-span-2">
                    <ClientInput />
                </div>
            </div>
            
        </>
    )
}