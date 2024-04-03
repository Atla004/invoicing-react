import Navbar from "../Components/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function mainLayout(props: LayoutProps) {
    return (
        <div className="p-4 w-full h-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-600">
            <Navbar></Navbar>   
                {props.children}
        </div>
    );
    
}