import { useState } from "react"

interface DialogSearchProps {
   table: string,
   field: string,
   show: boolean,
   setShow: Function
   setData: Function
}

type SearchResults = {
    id: string,
    name: string,
    dir: string
}

export default function DialogSearch({table, field, show, setShow, setData} : DialogSearchProps) {
    const [searchResults, setSearchResults] = useState<SearchResults[]>([])
    const search = async () => {
        setSearchResults([
            {
                id: "30604530",
                name: "Tomas",
                dir: "La lago"
            },
            {
                id: "30604531",
                name: "Juan",
                dir: "La lago"
            },
            {
                id: "30604532",
                name: "Pedro",
                dir: "La lago"
            }
        ])
    }
    return <>
        {
            show &&
            <div className="flex flex-col w-11/12 max-w-3xl h-5/6 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-md border bg-white gap-2" >
                <div className="flex flex-row">
                    <input type="text" placeholder={`Buscar ${table} por ${field}...`} className="h-8 w-full rounded-md border-2 px-2 " />
                    <button onClick={search} className="border rounded-md p-2 h-8 hover:bg-slate-100 transition-all flex items-center">Buscar</button>
                </div>
                <div id="results" className="flex-1 border-2 overflow-y-scroll">
                    {
                        searchResults.map((result: SearchResults, index) => {
                            return <div key={index} className="flex flex-row gap-2 p-2 justify-around items-center hover:bg-slate-100 transition-all">
                                <p>{result.id}</p>
                                <p>{result.name}</p>
                                <p>{result.dir}</p>
                                <button onClick={() => {setData(result); setShow(false)}} className="border rounded-md p-2 hover:bg-slate-100 transition-all">Seleccionar</button>
                            </div>
                        })
                    }
                </div>
                <button onClick={() => {setShow(false)}} className="border rounded-md p-2 hover:bg-slate-100 transition-all w-32">close</button>
            </div>
        }
    </>
}