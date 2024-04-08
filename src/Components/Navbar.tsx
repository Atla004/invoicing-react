import HelpDialog from "./HelpDialog";
import { useKeyCombination } from "@/hooks";
import { useState } from "react";

export default function Navbar() {
    const [openHelp, setOpenHelp] = useState(false);

    useKeyCombination(() => {
        setOpenHelp(!openHelp);
      }, ['ctrl','alt', 'h']);


    return (
        <>
            <div className="h-10 flex justify-end items-center absolute top-0 right-0">
                <HelpDialog open={openHelp} setOpen={setOpenHelp}/>
            </div>
        </>
    )
}