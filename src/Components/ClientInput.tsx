import { useRef, useState, useMemo} from "react";
import DialogSearch from "./DialogSearch";
import { CiSearch } from "react-icons/ci";
import { Client } from "../Views/Invoicing";
import { useKeyCombination } from "../hooks";
import ActionAlert from "./Alerts/ActionAlert";
import { toast } from "sonner";
import { invoiceStateAtom } from "@/Atoms/atoms";
import { useAtomValue } from "jotai";
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
  const [message, setMessage] = useState("");
  const invoiceState = useAtomValue(invoiceStateAtom);
  const isDisabled = useMemo(() => invoiceState === "cancelled" ||invoiceState === "finalized", [invoiceState]);
  const messages = {
    pid: "Buscar cliente por ID...",
    name: "Buscar cliente por nombre..."
  }

  useKeyCombination(() => {
    setMessage(messages['pid']);    
    // Si el modal se esta mostrando y se cambia el searchField, no se esconde
    if (searchField === "pid" || showModal === false) setShowModal(!showModal);
    setSearchField('pid')
  }, ["ctrl", "alt", "c"]);

  useKeyCombination(() => {
    setMessage(messages['name']); 
    // Si el modal se esta mostrando y se cambia el searchField, no se esconde
    if (searchField === "name" || showModal === false) setShowModal(!showModal);
    setSearchField('name') 
  }, ["ctrl", "alt", "n"]);

  
  const handleSearchClick = (field: "pid"|"name") => {
    setMessage(messages[field]);
    setShowModal(true);
    setSearchField(field);
  };
  const clientFields = ["pid_prefix", "pid", "name", "surname", "dir"];

  const saveClientButton = useRef<HTMLButtonElement>(null);

  const validateClient = () => {
    if (clientInfo.name === "" || clientInfo.surname === "" || clientInfo.pid === "" || clientInfo.dir === "") {
      toast.error("Por favor, rellene todos los campos");
      return false;
    }
    return true;
  }
  const saveClientInDB = async () => {
    const body = {
      ...clientInfo
    }

    if (!validateClient()) return;

    const res = await fetch("http://127.0.0.1:5000/createClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      type Response = {
        result: {
          action: string;
        }
      }
      const data: Response = await res.json();
      if (data.result.action === "insert") {
        toast.success("Cliente guardado exitosamente");
      }
      else {
        toast.success("Cliente actualizado exitosamente");
      }
    }
    else {
      toast.error("Error al guardar el cliente");
    }
  }

  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">Cliente</h1>
        <div className="flex flex-row gap-1 justify-start items-center">
          <input
            type="text"
            id="client"
            className="h-8 w-1/2 rounded-md border px-2 inline"
            placeholder="Nombre"
            maxLength={50}
            value={clientInfo.name}
            disabled={isDisabled}
            onChange={(e) => {
              setClientInfo({
                ...clientInfo,
                name: e.target.value,
              });
            }}
          />
          <input
            type="text"
            id="client"
            className="h-8 w-1/2 rounded-md border px-2 inline"
            placeholder="Apellido"
            maxLength={500}
            value={clientInfo.surname}
            disabled={isDisabled}
            onChange={(e) => {
              setClientInfo({
                ...clientInfo,
                surname: e.target.value,
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
          <select name="" id="client-pid-prefix" className="w-8 h-8 border rounded"
            onChange={(e) => setClientInfo({
              ...clientInfo,
              "pid_prefix": e.target.value
            })}
            value={clientInfo["pid_prefix"]}
            disabled={isDisabled}
          >
            <option value="V">V</option>
            <option value="J">J</option>
            <option value="E">E</option>
          </select>
          <input
            type="text"
            placeholder="ID"
            id="client-pid"
            maxLength={30}
            disabled={isDisabled}
            className="h-8 w-full rounded-md border  px-2 inline"
            value={clientInfo.pid}
            onChange={(e) => {
              setClientInfo({
                ...clientInfo,
                pid: e.target.value,
              });
            }}
          />
          <button
            className="rounded-md p-1 inline h-8 font-bold hover:bg-slate-200 transition-all"
            onClick={() => handleSearchClick("pid")}
          >
            <CiSearch />
          </button>
        </div>
        <div className="flex flex-row justify-start items-center">
          <input
            type="text"
            id="client"
            disabled={isDisabled}
            placeholder="Dirección"
            maxLength={100}
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
        <div className="">
            <ActionAlert
              title="¿Estás seguro?"
              description="¿Deseas guardar los cambios en el cliente? Esta acción no se puede deshacer."
              action={saveClientInDB}
              button="Crear/Actualizar Cliente"
              buttonColor="blue"
            >
            </ActionAlert>
        </div>
        
      </div>
      <DialogSearch
          table="client"
          field={searchField}
          show={showModal}
          setShow={setShowModal}
          setData={setClientInfo}
          fields={clientFields}
          focusOnClose={saveClientButton.current}
          message={message}
        />
    </div>
  );
}
