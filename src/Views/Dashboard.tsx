import { useEffect, useState, Suspense } from "react";
import BarChartA from "../Components/BarChartA"
import Navbar from "../Components/Navbar"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/Components/ui/resizable"

import TableCard from "@/Components/TableCard";

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
        className="flex items-center justify-center w-full h-[800px]"
        >
        <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-1000"
        >

    
            <ResizablePanel defaultSize={60}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        <BillCard />
                        
                    </ResizablePanel>

                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
  
                            <BarChartA />

                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={40}>
            <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={10}>
                    </ResizablePanel>

                    <ResizableHandle />
                    <ResizablePanel defaultSize={90}>
                        <div className="flex h-full items-center justify-center p-6">
                        <TableCard></TableCard>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

        </ResizablePanelGroup>
        </div>
                
    </>
    )
}