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
    // () => {
    //     const sidebar = document.getElementById('sidebar');
    //     sidebar?.classList.toggle("-translate-x-56")
    //     if (sidebarOpen) {

    //     }
    // }
    return (
        <aside id="sidebar" className="flex gap-0 flex-row transition-all overflow-hidden absolute -translate-x-56">

            <div id="side-content" className="p-5 w-56 h-dvh bg-slate-950 transition-all overflow-hidden ">
                <div className="logo flex items-center justify-center">
                    <CiLemon fontSize={40} className="text-yellow-400" />
                    <p className="text-xl text-yellow-400 font-extrabold">MEG</p>
                </div>
                <div className="content mt-5">
                    <ul>
                        {
                            routes.map((route) => {
                            return (
                                <li key={route.name} className="rounded-md text-slate-100 hover:bg-slate-900 transition-all">
                                    <Link to={route.route} className="w-full h-full flex gap-1 justify-start items-center p-2">
                                        {route.icon}
                                        {route.name}
                                    </Link>
                                </li>
                            ) 
                            })
                        }
                    
                    </ul>
                </div>
            </div>
            <div className="w-10 h-10 bg-slate-950 text-xl grid place-items-center text-slate-100 rounded-tr-md rounded-br-md">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <CiMenuBurger />
                </button>
            </div>
        </aside>

    )
}