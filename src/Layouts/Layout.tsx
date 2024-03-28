import Sidebar from "../Components/Sidebar"
import { Outlet } from "react-router-dom"
export default function Layout() {
    return (
        <div className="flex">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}