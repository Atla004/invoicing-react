import { CiSearch } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiLemon } from "react-icons/ci";

export default [
    {
        name: "Dashboard",
        route: "",
        icon: <CiLemon />
    },
    {
        name: "Facturar",
        route: "new",
        icon: <CiMoneyBill />
    },
    {
        name: "Buscar facturas",
        route: "search",
        icon: <CiSearch />
    },
]