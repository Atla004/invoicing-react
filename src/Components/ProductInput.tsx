import { useState } from "react";
import DialogSearch from "./DialogSearch";
import { CiSearch } from "react-icons/ci";
import { ProductEntry } from "../Views/Invoicing";
import { useKeyCombination } from "../hooks";

interface ProductInputProps {
  addEntry: (entry: ProductEntry) => void;
}

export default function ProductInput({ addEntry }: ProductInputProps) {
  const [showModal, setShowModal] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [productInfo, setProductInfo] = useState<ProductEntry>({
    name: "",
    code: "",
    photoUrl: "https://placehold.co/600x600?text=buscar+producto",
    quantity: 0,
    price: 0,
  });

  useKeyCombination(() => {
    setShowModal(!showModal);
    setSearchField("code");
  }, ["ctrl", "alt", "f"]);

  useKeyCombination(() => {
    setShowModal(!showModal);
    setSearchField("name");
  }, ["ctrl", "alt", "p"]);

  const controlledSetProductInfo = (productInfo: {
    name: string;
    code: string;
    photoUrl: string;
    price: number;
  }) => {
    setProductInfo({ ...productInfo, quantity: 0 });
  };

  const controlledAddEntry = (entry: ProductEntry) => {
    if (entry.quantity === 0) return;
    addEntry(entry);
    setProductInfo({
      name: "",
      code: "",
      photoUrl: "https://placehold.co/600x600?text=buscar+producto",
      quantity: 0,
      price: 0,
    });
  };

  const handleSearchClick = (field: string) => {
    setShowModal(true);
    setSearchField(field);
  };
  const productFields = ["name", "code", "photoUrl", "price"];

  const addMoreButton = document.getElementById("addMoreButton");

  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <h1 className="text-lg font-bold">Ingresar producto</h1>
          <div className="flex flex-row gap-1 justify-start items-center">
            <input
              type="text"
              id="client"
              className="h-8 w-full rounded-md border px-2 inline"
              placeholder="Name"
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
            <div className="flex flex-row gap-1 items-center">
              <input
                type="text"
                placeholder="Codigo"
                id="client"
                className="h-8 rounded-md border  px-2 inline"
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
                className="h-8 w-1/5 rounded-md border px-2 inline"
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
                id="addMoreButton"
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
            src={productInfo.photoUrl}
            className="rounded-md md:w-full object-cover w-48 h-48 max-w-full"
            alt=""
          />
        </div>
      </div>
      <DialogSearch
        table="producto"
        field={searchField}
        show={showModal}
        setShow={setShowModal}
        setData={controlledSetProductInfo}
        fields={productFields}
        focusOnClose={addMoreButton}
      />
    </div>
  );
}
