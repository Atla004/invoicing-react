import { useEffect, useState, Suspense } from "react";
import Navbar from "../Components/Navbar"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable"

import BillCard from "../Components/BillCard"
  

type HelloResponse = {
    message: string;
}

export default function Dashboard() {

    const [message, setMessage] = useState<HelloResponse>({message: ""});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:5000/hello");
            const data = await response.json();
            setMessage(data);
        }
        fetchData();
    }, [])

    return (
    <>
        <Navbar></Navbar>
        <h1 className="text-3xl">Dashboard</h1>
        <Suspense fallback={<p>Cargando...</p>}>
            {message.message && <p>{message.message}</p>}
        </Suspense>

        <div 
        className="flex items-center justify-center w-full h-[500px] bg-gray-200"
        >
        <ResizablePanelGroup
        direction="horizontal"
        className="h-[500px] w-[500px] bg-gray-200"
        >

    
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        <BillCard 
                        className="flex h-full items-center justify-center p-6"
                        />
                        
                    </ResizablePanel>

                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                        <span className="font-semibold">Three</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={50}>
                <div className="flex h-[200px] items-center justify-center p-6">
                <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>

        </ResizablePanelGroup>
        </div>
                
    </>
    )
}