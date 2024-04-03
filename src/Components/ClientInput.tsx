import { useState } from "react";
import DialogSearch from "./DialogSearch";
import { CiSearch } from "react-icons/ci";
import { Client } from "../Views/Invoicing";

interface ClientInputProps {
  clientInfo: Client;
  setClientInfo: (client: Client) => void;
}

export default function ClientInput({
  clientInfo,
  setClientInfo,
}: ClientInputProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSearchClick = (field: string) => {
    setShowModal(true);
    setSearchField(field);
  };
  const clientFields = ["id", "name", "surname", "dir"];
  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Cliente</h1>
        <div className="flex flex-row gap-1 justify-start items-center">
          <input
            type="text"
            id="client"
            className="h-8 w-full rounded-md border px-2 inline"
            placeholder="Name"
            value={clientInfo.name}
            disabled={disabled}
            onChange={(e) => {
              setClientInfo({
                ...clientInfo,
                name: e.target.value,
              });
            }}
          />
          <button
            className="rounded-md p-1 inline h-8 font-bold hover:bg-slate-200 transition-all"
            onClick={() => handleSearchClick("name")}
          >
            <CiSearch />
          </button>
        </div>
        <div className="flex flex-row gap-1 justify-start items-center">
          <input
            type="text"
            placeholder="ID"
            id="client"
            disabled={disabled}
            className="h-8 w-full rounded-md border  px-2 inline"
            value={clientInfo.id}
            onChange={(e) => {
              setClientInfo({
                ...clientInfo,
                id: e.target.value,
              });
            }}
          />
          <button
            className="rounded-md p-1 inline h-8 font-bold hover:bg-slate-200 transition-all"
            onClick={() => handleSearchClick("id")}
          >
            <CiSearch />
          </button>
        </div>
        <div className="flex flex-row justify-start items-center">
          <input
            type="text"
            id="client"
            disabled={disabled}
            placeholder="Direccion"
            className="h-8 w-full rounded-md border px-2 inline"
            value={clientInfo.dir}
            onChange={(e) => {
              setClientInfo({
                ...clientInfo,
                dir: e.target.value,
              });
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <button className="col-span-1 bg-green-500 text-white rounded-md p-2 w-full"
                onClick={() => setDisabled(!disabled)}
            >
                {disabled ? "Editar" : "Guardar"}
            </button>
            <button className="col-span-1 bg-red-500 text-white rounded-md p-2 w-full">Limpiar campos</button>
        </div>
        
      </div>
      <DialogSearch
          table="cliente"
          field={searchField}
          show={showModal}
          setShow={setShowModal}
          setData={setClientInfo}
          fields={clientFields}
        />
    </div>
  );
}
