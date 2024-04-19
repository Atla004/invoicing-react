import Sidebar from "../Components/Sidebar"
import { Outlet } from "react-router-dom"
import { useKeyCombination } from "../hooks"
import { useNavigate } from "react-router-dom"
import { Toaster } from "@/Components/ui/sonner"

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
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full">
                <Outlet />
            </main>
            <Toaster richColors />
            
        </div>
    )
}