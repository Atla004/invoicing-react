import { useEffect } from "react";

interface ErrorMessageProps {
    message: string;
    show: boolean;
}
export default function ErrorMessage({ message, show }: ErrorMessageProps) {
    useEffect(() => {
        const error = document.getElementById("error-message");

        if (show) {
            error?.classList.add("block");
            error?.classList.remove("hidden");

            setTimeout(() => {
                error?.classList.toggle('-translate-y-2')
                error?.classList.add("opacity-100");
                error?.classList.remove("opacity-0");
            }, 100);
            
        } else {
            error?.classList.toggle('-translate-y-2')
            error?.classList.add("opacity-0");
            error?.classList.remove("opacity-100");

            setTimeout(() => {
                error?.classList.add("hidden");
                error?.classList.remove("block");
            }, 100);
        }

    }, [show]) 


    return (
        // fixed position top right, square div with red background and white text

        <div id="error-message" className={`fixed z-20 top-2 right-2 p-4 rounded-md w-52 bg-red-500 text-white block transition-all`}>
            <p className="font-bold">Error</p>
            <p>{message}</p>
        </div>
    )
}
