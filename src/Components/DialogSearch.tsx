import { useEffect, useState } from "react";


interface DialogSearchProps {
  table: string;
  field: string;
  show: boolean;
  setShow: Function;
  setData: Function;
  fields: string[];
  focusOnClose?: HTMLElement | null;
}

export type SearchResults = {
  [key: string]: string;
};



export default function DialogSearch({
  table,
  field,
  show,
  setShow,
  setData,
  fields,
  focusOnClose,
}: DialogSearchProps) {
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [searchField, setSearchField] = useState("");
  const search = async () => {
    if (searchField === "") return;
    const body = {
      table: table,
      field: field,
      value: searchField,
    }
    const response = await fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
    setSearchResults(data["result"]);

  };

  useEffect(() => {
    if (show) {
      (document.getElementById("searchField-dialog") as HTMLElement)?.focus();
    }
  }
  , [show]);

  // when searchData changes, focus on the first button of the results
  useEffect(() => {
    if (searchResults.length > 0) {
      (document.getElementById("results")?.firstElementChild?.lastElementChild as HTMLElement).focus();
    }
  }, [searchResults]);
  return (
    <>
      {show && (
        <div className="flex flex-col w-11/12 max-w-3xl h-5/6 p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-md border bg-white gap-2 shadow-xl">
          <div className="flex flex-row gap-2">
            <input
              type="text"
              id="searchField-dialog"
              placeholder={`Buscar ${table} por ${field}...`}
              className="h-8 w-full rounded-md border px-2 "
              value={searchField}
              onChange={(e) => {
                setSearchField(e.target.value);
              }}
             onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search();
                }
              }
             }
            />
            <button
              onClick={() => {search()}}
              className="border rounded-md p-2 h-8 hover:bg-slate-100 transition-all flex items-center"
            >
              Buscar
            </button>
          </div>
          <div id="results" className="flex-1 border overflow-y-scroll">
            {searchResults.map((result: SearchResults, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row gap-2 p-2 justify-around items-center hover:bg-slate-100 transition-all"
                >
                  {fields &&
                    fields.map((field) => {
                      return (
                        <p key={field} className="text-sm">
                          {result[field]}
                        </p>
                      );
                    })}
                  <button
                    onClick={() => {
                      setData(result);
                      setShow(false);
                      setSearchResults([]);
                      if (focusOnClose) {
                        focusOnClose.focus();
                      }
                    }}
                    className="border rounded-md p-2 hover:bg-slate-100 transition-all"
                  >
                    Seleccionar
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              setShow(false);
              setSearchResults([]);
            }}
            className="border rounded-md p-2 hover:bg-slate-100 transition-all w-32"
          >
            close
          </button>
        </div>
      )}
    </>
  );
}
