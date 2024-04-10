import { atom } from "jotai";

type InvoiceState = "draft" | "finalized" | "cancelled";

export const invoiceStateAtom = atom<InvoiceState>("draft");