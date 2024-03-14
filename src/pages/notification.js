import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Notification() {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className="flex flex-col pt-32 mx-6">
                <BackButton/>
                <p className="flex justify-center items-center text-blue-text pt-64 px-2">Não há notificações disponíveis! 😌</p>
            </div>

        <div>
            <Footer/>
        </div>
        </>
    )
}