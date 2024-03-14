import { Logo, MenuBar, Notification } from "./Icons";
import Link from "next/link";
import { useState} from 'react';


export default function NavBar() {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-opacity-80 pb-4 bg-white-background">
            <div className="flex justify-between mx-6">
                <Link href="/" className="pt-6"><Logo /></Link>
                <div className="flex gap-4 pt-12 items-center">
                    <Link href="./notification"><Notification /></Link>
                    <DropdownMenuIcon/>
                </div>
            </div>
        </div>
    )
}

function DropdownMenuIcon() {
    const [showDropdown, setShowDropdown] = useState(false);
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
  
    return (
      <div className="relative top-0 z-50 pr-2.5">
        <button className="bg-white-background Z-50" onClick={toggleDropdown}><MenuBar/></button>
        {showDropdown && (
          <div className="flex flex-col absolute gap-6 items-center right-0 text-white h-44 w-32 mt-2 bg-footer rounded-lg border justify-center">
            <Link href="./tasks" className="block px-4 py-2">Tarefas</Link>
              <Link href="#" className="block px-4 py-2">Login</Link>
    
          </div>
        )}
       
      </div>
    );
  }

