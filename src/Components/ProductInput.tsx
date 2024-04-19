import { useRef, useState } from "react";
import DialogSearch from "./DialogSearch";
import { CiSearch } from "react-icons/ci";
import { ProductEntry } from "../Views/Invoicing";
import { useKeyCombination } from "../hooks";
import { toast } from "sonner";
import { invoiceStateAtom } from "@/Atoms/atoms";
import { useAtomValue } from "jotai";

interface ProductInputProps {
  addEntry: (entry: ProductEntry) => void;
}

export default function ProductInput({ addEntry }: ProductInputProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [message, setMessage] = useState("");
  const defaultPhotoUrl = "https://placehold.co/600x600?text=buscar+producto";
  const [productInfo, setProductInfo] = useState<ProductEntry>({
    name: "",
    code: "",
    photourl: defaultPhotoUrl,
    quantity: 0,
    price: 0,
  });
  const messages = {
    code: "Buscar producto por código...",
    name: "Buscar producto por nombre..."
  }
  const invoiceState = useAtomValue(invoiceStateAtom);

  useKeyCombination(() => {
    setMessage(messages['code']);
    // Si el modal se esta mostrando y se cambia el searchField, no se esconde
    if (searchField === "code" || showModal === false) setShowModal(!showModal);
    setSearchField("code");
  }, ["ctrl", "alt", "f"]);

  useKeyCombination(() => {
    setMessage(messages['name']);
    // Si el modal se esta mostrando y se cambia el searchField, no se esconde
    if (searchField === "name" || showModal === false) setShowModal(!showModal);
    setSearchField("name");
  }, ["ctrl", "alt", "p"]);

  const controlledSetProductInfo = (productInfo: {
    name: string;
    code: string;
    photourl: string;
    price: number;
  }) => {
    setProductInfo({ ...productInfo, quantity: 0 });
  };

  const controlledAddEntry = (entry: ProductEntry) => {
    if (entry.quantity === 0) {
      toast.error("La cantidad no puede ser 0");
      return;
    };
    if (entry.name === "" || entry.code === "" ) {
      toast.error("Por favor, rellene todos los campos");
      return;
    }
    if (entry.photourl === defaultPhotoUrl) {
      toast.error("Por favor, seleccione un producto válido");
      return;
    }
    if (invoiceState === "finalized" || invoiceState === "cancelled") {
      toast.error("No se puede agregar productos a una factura finalizada o anulada");
      return;
    }
    addEntry(entry);
    setProductInfo({
      name: "",
      code: "",
      photourl: "https://placehold.co/600x600?text=buscar+producto",
      quantity: 0,
      price: 0,
    });
  };

  const handleSearchClick = (field: "name"|"code") => {
    setMessage(messages[field]);
    setShowModal(true);
    setSearchField(field);
  };
  const productFields = ["name", "code", "photourl", "price"];

  const addMoreButton = useRef<HTMLButtonElement>(null);

  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-lg font-bold">Ingresar producto</h1>
          <div className="flex flex-row gap-1 justify-start items-center">
            <input
            disabled
              type="text"
              id="product-name"
              className="h-8 w-full rounded-md border px-2 inline"
              placeholder="Nombre"
              value={productInfo.name}
              onChange={(e) => {
                setProductInfo({
                  ...productInfo,
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

          <div className="flex flex-row gap-1 justify-between items-center">
              <input
                type="text"
                disabled
                placeholder="Código"
                id="client"
                className="h-8 w-full rounded-md border px-2 inline"
                value={productInfo.code}
                onChange={(e) => {
                  setProductInfo({
                    ...productInfo,
                    code: e.target.value,
                  });
                }}
              />
              <button
                className="rounded-md p-1 inline h-8 font-bold hover:bg-slate-200 transition-all"
                onClick={() => handleSearchClick("code")}
              >
                <CiSearch />
              </button>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <button
                className=" bg-red-500 text-white rounded-md w-8 h-8"
                onClick={() =>
                  setProductInfo({
                    ...productInfo,
                    quantity:
                      productInfo.quantity - 1 < 0
                        ? 0
                        : productInfo.quantity - 1,
                  })
                }
              >
                -
              </button>
              <input
                type="number"
                disabled
                id="quantity"
                className="h-8 w-1/4 rounded-md border px-2 inline"
                placeholder="Quantity"
                value={productInfo.quantity}
                onChange={(e) => {
                  setProductInfo({
                    ...productInfo,
                    quantity: parseInt(e.target.value),
                  });
                }}
              />
              <button
                ref={addMoreButton}
                className=" bg-blue-500 text-white rounded-md w-8 h-8"
                onClick={() =>
                  setProductInfo({
                    ...productInfo,
                    quantity: productInfo.quantity + 1,
                  })
                }
              >
                +
              </button>
          </div>
          <div className="flex flex-row gap-1 justify-start items-center"></div>

          <div className="prices flex gap-4 items-center justify-end">
            <p className="text-sm">Precio: ${productInfo.price}</p>
            <p className="text-lg font-bold ">
              Total: ${productInfo.price * productInfo.quantity}
            </p>
          </div>
          <button
            id="agregar-producto"
            className="bg-green-500 text-white rounded-md p-2 w-full"
            onClick={() => controlledAddEntry(productInfo)}
          >
            Agregar
          </button>
        </div>
        <div className="rounded-md grid place-items-center ">
          <img
            src={productInfo.photourl}
            className="rounded-md md:w-full object-cover w-48 h-48 max-w-full"
            alt=""
          />
        </div>
      </div>
      <DialogSearch
        table="product"
        field={searchField}
        show={showModal}
        setShow={setShowModal}
        setData={controlledSetProductInfo}
        fields={productFields}
        focusOnClose={addMoreButton.current}
        message={message}
      />
    </div>
  );
}
