import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/Components/ui/alert-dialog";
  
  
  
  interface AlertDialogProps {
      action: () => void;
      title: string;
      description: string;
      button: string;
      buttonColor: "red" | "green" | "blue" | "yellow" ;
      open: boolean;
      setOpen: (open: boolean) => void;
      disabled?: boolean;
  }
  
  /**
   * Dialogo de alerta que puede abrirse desde JS
   * @param action Función a ejecutar al hacer click en el botón de continuar
   * @param title Título del dialogo
   * @param description Descripción del dialogo
   * @param button Texto del botón de acción
   * @param buttonColor Color del botón de acción
   * @param open Estado del dialogo
   * @param setOpen Función para cambiar el estado del dialogo
   */
  export default function ActionAlertProg({ action, title, description, button, buttonColor, open, setOpen, disabled }: AlertDialogProps) {
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <button className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-700 text-white rounded-md p-2 w-full`} disabled={disabled}>
            {button}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-red-500 hover:bg-red-700 text-white hover:text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={action}
              className="bg-green-500 hover:bg-green-700 text-white"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  