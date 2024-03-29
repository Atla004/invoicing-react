import { useState } from "react"
import DialogSearch from "./DialogSearch"
import { CiSearch } from "react-icons/ci"

export default function SearchInput() {
    const [showModal, setShowModal] = useState(false)
    const [searchField, setSearchField] = useState("")
    const [clientInfo, setClientInfo] = useState({
        name: "",
        id: "",
        dir: ""
    })
    const handleSearchClick = (field:string) => {
        setShowModal(true)
        setSearchField(field)
    } 
    return (
    <div className="border-2 border-slate-700 p-4 rounded-md">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <div className="flex flex-col gap-2">

            <div className="flex flex-col">
                <label htmlFor="client">Nombre</label>
                <div className="flex flex-row justify-start items-center">
                    <input type="text" id="client" className="h-8 w-56 rounded-md border-2 px-2 inline" value={clientInfo.name}
                        onChange={(e) => {
                            setClientInfo({
                                ...clientInfo,
                                name: e.target.value
                            })
                        }}
                    />
                    <button className="rounded-md p-1 inline h-8 font-bold" onClick={() => handleSearchClick("nombre")}>
                        <CiSearch />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="client">ID</label>
                <div className="flex flex-row justify-start items-center">
                    <input type="text" id="client" className="h-8 w-56 rounded-md border-2  px-2 inline" value={clientInfo.id}
                        onChange={(e) => {
                            setClientInfo({
                                ...clientInfo,
                                id: e.target.value
                            })
                        }}
                    />
                    <button className="rounded-md p-1 inline h-8 font-bold" onClick={() => handleSearchClick("id")}>
                        <CiSearch />
                    </button>
                </div>
            </div>        <div className="flex flex-col gap-2">
                <label htmlFor="client">Direccion</label>
                <div className="flex flex-row justify-start items-center">
                    <input type="text" id="client" className="h-8 w-56 rounded-md border-2 px-2 inline" value={clientInfo.dir}
                        onChange={(e) => {
                            setClientInfo({
                                ...clientInfo,
                                dir: e.target.value
                            })
                        }}
                    />

                </div>
            </div>
            <DialogSearch table="cliente" field={searchField} show={showModal} setShow={setShowModal} setData={setClientInfo} />

        </div>
    </div>
    )
}