import Link from "next/link";
import { Gato, Recursos, User } from "./Icons";

export default function Footer() {
    return (
       <div className="fixed bottom-0 w-full flex justify-center items-center gap-24 bg-footer bg-opacity-80 backdrop-blur-sm h-20">
        <Link href="/"><Recursos /></Link>
        <Link href="/cats"><Gato/></Link>
        <Link href="/profile"><User /></Link>
       </div>
    )
}