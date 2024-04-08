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
}

export default function ActionAlert({ action, title, description, button, buttonColor }: AlertDialogProps) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-700 text-white rounded-md p-2 w-full`}>
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
