import { Gato, Recursos, User } from "./icons";

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full flex justify-between rounded-t-2xl px-12 bg-neutral-500 bg-opacity-60 backdrop-blur-sm py-5 items-center text-white">
            <Gato />
            <Recursos/>
            <User className="text-4xl"/>
        </div>
    )
}