import { useEffect, useMemo } from "react";
import { CiTrash } from "react-icons/ci";

import {
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { ProductEntry } from "../Views/Invoicing";
import { useKeyCombination } from "@/hooks";

interface ProductTableProps {
  products: ProductEntry[];
  setProducts: any;
  amountLeft: number;
}

export default function ProductTable({ products, setProducts, amountLeft}: ProductTableProps) {

  useKeyCombination(() => {
    console.log("pressed");
  }, ["ctrl", "alt", "l"])

  const subtotal = useMemo(() => {
    return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }, [products]);

  useEffect(() => {
    console.log(products);
  }
  , [products]);

  const columns = useMemo<MRT_ColumnDef<ProductEntry>[]>(() => {
    return [
        {
            accessorKey: "photourl",
            header: "Foto",
            Cell: ({row}) => (
                <img src={row.original.photourl} alt={row.original.name} className="rounded-md h-10 w-10" />
            ),
            size: 50,
        },
        {
            accessorKey: "name",
            header: "Producto", 
            size: 100,
        },
        {
            accessorKey: "code",
            header: "Codigo",
            size: 100,
        },
        {
            accessorFn: (row) => "$" + row.price,
            header: "Precio",
            size: 50,
        },
        {
            header: "Cantidad",
            Cell: ({row}) => (
                // btns to increase and decrease quantity
                <div className="flex flex-row gap-4 w-full items-center">
                    
                    <button 
                    className="font-bold text-md border w-8 h-8 rounded-md grid place-items-center hover:bg-red-500 hover:text-white transition-all"
                    onClick={() => {
                      console.log("reduce q")
                      setProducts((prevProducts: ProductEntry[]) => {
                        const newProducts = [...prevProducts]

                        newProducts[row.index].quantity -= 1

                        if (newProducts[row.index].quantity < 1) {
                          newProducts[row.index].quantity =1
                        }

                        return newProducts
                      });
                    }}>-</button>
                    <span>{row.original.quantity}</span>
                    <button 
                    className="font-bold text-md border w-8 h-8 rounded-md grid place-items-center hover:bg-blue-500 hover:text-white transition-all"
                    onClick={() => {
                      setProducts((prevProducts: ProductEntry[]) => {
                        const newProducts = [...prevProducts]

                        newProducts[row.index].quantity += 1

                        return newProducts
                      });

                        
                    }}>+</button>
                </div>
            ),
            size: 100,
        },
        {
            accessorFn: (row) => "$" + (row.price * row.quantity),
            header: "Total",
            size: 50,
        },
        {
          id: "actions",
          header: "",
          Cell: ({row}) => (
            <button
              className="text-white bg-red-500 rounded-md p-1 w-8 h-8 hover:bg-red-700 transition-all grid place-items-center"
              onClick={() =>{
                setProducts((prevProducts: ProductEntry[]) => prevProducts.filter((p) => p.code !== row.original.code));
              }
              }
            >
              <CiTrash />
            </button>
          ),
          size: 50,
        }
        
        
    ]
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: products,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableGrouping: false,
    enableRowActions: false,
    enableDensityToggle: false,
    enableGlobalFilter: false,
    enableFullScreenToggle: false,
    initialState : {
      density: "compact"
    },
    muiTableContainerProps: {
      sx: {
        height: "280px",
        maxHeight: "280px",
      },
    }
  })
  return (
    <div className="shadow-xl p-4 rounded-md bg-white">
        <h2 className="text-lg font-bold">Productos</h2>
        <MaterialReactTable table={table}/>
        
        <div className="flex flex-row justify-end gap-4 mt-4">
            <h3 className="text-md font-bold">Subtotal:</h3>
            <h3 className="text-md font-bold">
              ${subtotal.toFixed(2)}
            </h3>
        </div>
        <div className="flex flex-row justify-end gap-4">
            <h3 className="text-md">Impuesto (10%):</h3>
            <h3 className="text-md">
              ${(subtotal * 0.1).toFixed(2)}
            </h3>
        </div>
        <div className="flex flex-row justify-end gap-4 mt-2">
            <h3 className="text-xl font-bold">Total:</h3>
            <h3 className="text-xl font-bold">
              ${
                // round to two decimal places
                (subtotal * 1.1).toFixed(2)
              }
            </h3>
        </div>

    </div>
  );
}

