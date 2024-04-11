import { CiLemon } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import routes from "../Data/links"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    useEffect(() => {
        const sidebar = document.getElementById('sidebar')
        console.log(sidebarOpen)
        sidebar?.classList.toggle('-translate-x-56')

    }, [sidebarOpen])

    return (
        <aside id="sidebar" className="flex gap-0 flex-row transition-all overflow-hidden absolute -translate-x-56  z-20 bottom-0">

            <div id="side-content" className="p-5 w-56 h-dvh bg-slate-50 transition-all overflow-hidden flex flex-col">
                <div className="logo flex items-center justify-center">
                    <CiLemon fontSize={40} className="text-blue-500" />
                    <p className="text-xl text-blue-500 font-extrabold">MEG</p>
                </div>
                <div className="content mt-5">
                    <ul>
                        {
                            routes.map((route) => {
                            return (
                                <li key={route.name} className="rounded-md hover:bg-slate-200 transition-all">
                                    <Link onClick={() => setSidebarOpen(!sidebarOpen)} to={route.route} className="w-full h-full flex gap-1 justify-start items-center p-2">
                                        {route.icon}
                                        {route.name}
                                    </Link>
                                </li>
                            ) 
                            })
                        }
                    
                    </ul>
                </div>
                {/* make the div be at the bottom */}
                <div className="mt-auto">

                </div>
            </div>
            <div className="w-10 h-10 bg-slate-200 text-xl grid place-items-center rounded-br">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <CiMenuBurger />
                </button>
            </div>
        </aside>

    )
}