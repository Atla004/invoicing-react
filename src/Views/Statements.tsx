import Navbar from "../Components/Navbar"
import SearchModalFactura from "../Components/SearchModalFactura"


export default function Statements() {
    return (
        <>
            <Navbar></Navbar>
            <h1 className="text-3xl">Cierres diarios</h1>
            <SearchModalFactura
                id={100}
            ></SearchModalFactura>

        </>
    )
}