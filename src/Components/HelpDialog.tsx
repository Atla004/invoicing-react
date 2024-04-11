import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

import { KeyCombo } from "./ui/keyboard";

export default function HelpDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="hover:bg-[hsla(0,0%,100%,0.2)]"><span className="mr-2 text-white">Ayuda</span>   
            <KeyCombo keys={["Ctrl", "Alt", "H"]}></KeyCombo>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl max-h-dvh overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ayuda</DialogTitle>
          <DialogDescription>
            Los atajos de teclado te permiten navegar por la aplicación sin usar el mouse.
          </DialogDescription>
        </DialogHeader>
        <h2 className="text-lg font-bold">General</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "H"]}></KeyCombo>
                <span>Abrir Ayuda</span>
            </div>
            <div className="flex justify-between items-center gap-2">
                <KeyCombo keys={["Ctrl", "Alt", "1"]}></KeyCombo>
                <span>Ir a la página de inicio</span>
            </div>
            <div className="flex justify-between items-center gap-2">
                <KeyCombo keys={["Ctrl", "Alt", "2"]}></KeyCombo>
                <span>Facturar</span>
            </div>
            <div className="flex justify-between items-center gap-2">
                <KeyCombo keys={["Ctrl", "Alt", "3"]}></KeyCombo>
                <span>Buscar facturas</span>
            </div>
        </div>
        <h2 className="text-lg font-bold">Facturar</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "C"]}></KeyCombo>
                <span>Buscar cliente (ID)</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "N"]}></KeyCombo>
                <span>Buscar cliente (Nombre)</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "P"]}></KeyCombo>
                <span>Buscar producto (Nombre)</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "F"]}></KeyCombo>
                <span>Buscar producto (Codigo)</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "T"]}></KeyCombo>
                <span>Cambiar tab</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "O"]}></KeyCombo>
                <span>Agregar pago</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "D"]}></KeyCombo>
                <span>Facturar</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "R"]}></KeyCombo>
                <span>Anular Factura</span>
            </div>
            <div className="flex gap-2 justify-between items-center">
                <KeyCombo keys={["Ctrl", "Alt", "I"]}></KeyCombo>
                <span>Enfocar la tabla de Pagos</span>
            </div>
            <div className="flex gap-2 justify-benpm ru devtween items-center">
                <KeyCombo keys={["Ctrl", "Alt", "I"]}></KeyCombo>
                <span>Enfocar la tabla de Productos</span>
            </div>
        </div>
        <h2 className="text-lg font-bold">Dashboard</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
          <div className="flex gap-2 justify-between items-center">
            <KeyCombo keys={["Ctrl", "Alt", "C"]}></KeyCombo>
            <span>Cerrar Caja</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
