import Sidebar from "../Components/Sidebar"
import { Outlet } from "react-router-dom"
import { useKeyCombination } from "../hooks"
import { useNavigate } from "react-router-dom"
export default function Layout() {
    const navigate = useNavigate();
    useKeyCombination(() => {
        navigate("/")
    }, ['ctrl','alt', "1"])
    useKeyCombination(() => {
        navigate("/new")
    }, ['ctrl','alt', "2"])
    useKeyCombination(() => {
        navigate("/search")
    }, ['ctrl','alt', "3"])
    useKeyCombination(() => {
        navigate("/statements")
    }, ['ctrl','alt', "4"])
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full">
                <Outlet />
            </main>
            
        </div>
    )
}