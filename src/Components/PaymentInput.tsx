import { useMemo, useState, useRef, useEffect } from "react";
import { Payment } from "../Views/Invoicing";
import { toast } from "sonner";
import { useKeyCombination } from "@/hooks";
import { bsToUsd } from "@/functions";
import { invoiceStateAtom } from "@/Atoms/atoms";
import { useAtomValue } from "jotai";
interface PaymentInputProps {
    addPayment: (payment: Payment) => void;
    amountLeft: number;
}

export default function PaymentInput({ addPayment, amountLeft }: PaymentInputProps) {

    const invoiceState = useAtomValue(invoiceStateAtom);

    const selectPaymentMethod = useRef<HTMLSelectElement>(null);

    const [payment, setPayment] = useState<Payment>({
        method: "EFECTIVO",
        bank: "",
        amount: 0,
    });
    useEffect(() => {
        // set currency to the first currency available for the selected payment method

        const currency = paymentMethods.find((method) => method.name === payment.method)?.currencies[0];

        if (currency) {
            setCurrency({
                name: currency,
            });
        }
        else {
            setCurrency({
                name: "USD",
            });
        }
    }, [payment.method])

    const [currency, setCurrency] = useState({
        name: "BS",
    });

    const isBankDisabled = useMemo(() => {
        return payment.method === "cash"
    }, [payment])

    const paymentMethods = [
        {
                name: "EFECTIVO",
                banks: [],
                currencies: ["BS", "USD"]
        },
        {
                name: "TARJETA DE CREDITO",
                banks: ["Seleccionar Banco", "BNC", "VENEZUELA", "BANESCO"],
                currencies: ["BS"]
        },  
        {
                name: "TARJETA DE DEBITO",
                banks: ["Seleccionar Banco", "BNC", "VENEZUELA", "BANESCO"],
                currencies: ["BS"]

        },
        {
                name: "ZELLE",
                banks: ["Seleccionar Banco", "BOFA", "CHASE"],
                currencies: ["USD"]
        },
    ]

    const controlledAddPayment = () => {
        console.log(currency.name)
        const controlledPayment = {...payment}

        if (invoiceState !== "draft") {
            toast.error("No puedes agregar pagos a una factura finalizada o anulada");
            return;
        }
        
        // if amount has more than 2 decimal places, warn
        if (controlledPayment.amount.toString().split(".")[1]?.length > 2) {
            toast.warning("El monto ingresado tiene más de 2 decimales. Se truncará automaticamente.");
        }
        controlledPayment.amount = parseFloat(controlledPayment.amount.toFixed(2));

        if (controlledPayment.amount === 0) {
            toast.error("El monto ingresado no puede ser 0");
        }
        if (currency.name === "BS") {
            controlledPayment.amount = bsToUsd(controlledPayment.amount);
        }
        if (controlledPayment.amount > amountLeft) {
            toast.error("El monto ingresado es mayor al monto restante por pagar");
            return;
        }
        if (controlledPayment.bank === "" && controlledPayment.method !== "EFECTIVO") {
            toast.error("El método de pago seleccionado requiere un banco");
            return;
        }
        addPayment(controlledPayment);
        console.log(payment)
        setPayment({
            method: "EFECTIVO",
            bank: "",
            amount: 0,
            
        });
    }

    const amountLeftRef = useRef(amountLeft);
    useEffect(() => {
        amountLeftRef.current = amountLeft;
    });

    useKeyCombination(() => {
        if (selectPaymentMethod.current) {
            selectPaymentMethod.current.focus();
        }
    }, ["ctrl", "alt", "o"]);


    return (
        <div className="shadow-xl p-4 rounded-md bg-white">
                <div className="flex flex-col gap-2 flex-1">
                    <h1 className="text-lg font-bold">Ingresar pago</h1>
                    <div className="flex flex-row gap-1 justify-start items-center">
                    </div>
                        <select className="h-8 w-full rounded-md border px-2 inline" 
                        ref={selectPaymentMethod}
                        value={payment.method} 
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
                                <option key={method.name} value={method.name}>{method.name}</option>
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
                                paymentMethods.find((method) => method.name === payment.method)?.banks.map((bank) => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-row gap-1 justify-start items-center">
                            {/* amount */}
                            <select className="h-8 rounded-md border px-2 inline" value={currency.name}
                            onChange={(e) => {
                                setCurrency({
                                    name: e.target.value
                                });
                            } }
                            >
                                {/* Solo monedas permitidas por el metodo de pago */}
                                {
                                    paymentMethods.find((method) => method.name === payment.method)?.currencies.map((currency) => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))
                                }
                            </select>
                            <input type="number" className="h-8 w-full rounded-md border px-2 inline text-right" step={0.01} 
                            value={payment.amount}
                            onChange={(e) => 
                                setPayment({
                                    ...payment,
                                    amount: parseFloat(e.target.value)
                                })
                            }
                            />
                            {/* button that puts payment.amount == amount left */}
                            <button className="bg-green-500 text-white rounded-md h-8 px-2"
                                onClick={() => {
                                    setPayment({
                                        ...payment,
                                        amount: amountLeftRef.current,
                                    });
                                }}
                            >
                                Llenar
                            </button>
                    </div>
                    
                    <button className="bg-green-500 text-white rounded-md p-2 w-full"
                        onClick={controlledAddPayment}
                    >
                        Agregar
                    </button>
                </div>
        </div>
    );
}
