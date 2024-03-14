import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Notification() {
    return (
        <>
            <div>
                <NavBar />
            </div>
        <p className="flex items-center justify-center text-sm text-blue-text py-96">Não há notificações disponíveis! </p>

        <div>
            <Footer/>
        </div>
        </>
    )
}