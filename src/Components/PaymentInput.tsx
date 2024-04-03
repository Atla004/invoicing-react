import { useMemo, useState } from "react";
import { Payment } from "../Views/Invoicing";
import ErrorMessage from "./ErrorMessage";

interface PaymentInputProps {
    addPayment: (payment: Payment) => void;
    amountLeft: number;
}

export default function PaymentInput({ addPayment, amountLeft }: PaymentInputProps) {

    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const [payment, setPayment] = useState<Payment>({
        method: "cash",
        bank: "",
        amount: 0,
    });

    const [currency, setCurrency] = useState({
        name: "$",
        dbname: "usd",
    });

    const isBankDisabled = useMemo(() => {
        return payment.method === "cash"
    }, [payment])

    const currencies = [
        {
            name: "$",
            dbname: "usd",
        },
        {
            name: "Bs.",
            dbname: "bs",
        },
    ]
    const paymentMethods = [
        {
                name: "Efectivo",
                banks: [],
                dbname: "cash",
        },
        {
                name: "Tarjeta de crédito",
                banks: ["BNC", "Venezuela", "Banesco"],
                dbname: "credit",
        },  
        {
                name: "Tarjeta de débito",
                banks: ["BNC", "Venezuela", "Banesco"],
                dbname: "debit",
        },
        {
                name: "Zelle",
                banks: ["BofA", "Chase", "Wells Fargo"],
                dbname: "zelle",
        },
    ]

    const controlledAddPayment = () => {
        if (payment.amount === 0) {
            return;
        }
        if (payment.amount > amountLeft) {
            setErrorMessage("El monto ingresado es mayor al monto restante por pagar");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }
        addPayment(payment);
        console.log(payment)
        setPayment({
            method: "cash",
            bank: "",
            amount: 0,
        });
    }

    return (
        <div className="shadow-xl p-4 rounded-md bg-white">
                <div className="flex flex-col gap-2 flex-1">
                    <h1 className="text-2xl font-bold">Ingresar pago</h1>
                    <div className="flex flex-row gap-1 justify-start items-center">
                    </div>
                        <select className="h-8 w-full rounded-md border px-2 inline" value={payment.method} 
                        onChange={
                            (e) => {
                                setPayment({
                                    ...payment,
                                    method: e.target.value,
                                });
                            }
                        }
                        
                        >
                            {paymentMethods.map((method) => (
                                <option key={method.dbname} value={method.dbname}>{method.name}</option>
                            ))}
                        </select>
                    <div className="flex flex-row gap-1 justify-start items-center">
                        <select className="h-8 w-full rounded-md border px-2 inline" disabled={isBankDisabled}
                        value={payment.bank}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setPayment({
                                ...payment,
                                bank: e.target.value,
                            });
                        }}
                        >
                            {
                                paymentMethods.find((method) => method.dbname === payment.method)?.banks.map((bank) => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-row gap-1 justify-start items-center">
                            {/* amount */}
                            <select className="h-8 rounded-md border px-2 inline" value={currency.dbname}
                            onChange={(e) => {
                                setCurrency({
                                    name: e.target.value === "usd" ? "$" : "Bs.",
                                    dbname: e.target.value,
                                });
                            } }
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.dbname} value={currency.dbname}>{currency.name}</option>
                                ))}
                            </select>
                            <input type="number" className="h-8 w-full rounded-md border px-2 inline text-right" step={0.01} 
                            value={(payment.amount).toFixed(2)}
                            onChange={(e) => 
                                setPayment({
                                    ...payment,
                                    amount: parseFloat(e.target.value)
                                })
                            }
                            />
                    </div>
                    
                    <button className="bg-green-500 text-white rounded-md p-2 w-full"
                        onClick={controlledAddPayment}
                    >
                        Agregar
                    </button>
                </div>
            <ErrorMessage  message={errorMessage} show={showError}/>
        </div>
    );
}
