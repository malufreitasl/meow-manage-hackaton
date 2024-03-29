import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

export default function catInfo() {
    const [infoAboutCat, setInfoAboutCat] = useState({})
    const [buttonAdopted, setButtonAdopted] = useState(true)
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {

        const fetchCatInfo = async () => {

            try {
                const response = await fetch(`/api/cat/info?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch info about cat data');
                }
                const data = await response.json();

                setButtonAdopted(data.adopted)

                setInfoAboutCat(data);
            } catch (error) {
                console.error('Failed to fetch info about cat data:', error);
            }
        };

        if (id) {
            fetchCatInfo();
        }
    }, [id]);


    const adoptedMe = async () => {
        await fetchAdoptedCat(id)
    };

    const fetchAdoptedCat = async (id) => {
        try {
            const response = await fetch("../api/cat/adopted", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            })
            const newResponse = await response.json();
            if (newResponse) {
                setButtonAdopted(!buttonAdopted)
            }
        } catch (error) {
            setButtonAdopted(true)
            console.error('Failed to fetch cat adoption:', error);
        }
    }

    return (
        <div className={"h-screen w-screen py-28"}>
            <NavBar />
            <div className="mx-8">
                <BackButton/>
            </div>
            <div className="flex flex-col items-center justify-center py-8 ">

                <div
                    style={{
                        backgroundImage: `url(${infoAboutCat?.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="flex flex-col items-center h-48 w-48 rounded-full bg-black justify-center"
                >

                </div>
            </div>

            <div className="bg-light-blue rounded-2xl h-auto mx-6 px-2">

                <div className="flex justify-center items-center h-24 ">
                    <p className="text-blue-text text-3xl font-bold">{infoAboutCat?.name}</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-center gap-2 ">
                        <div className="bg-white-background text-black flex flex-col items-center rounded-2xl p-4 h-22 w-24">
                            <p className="text-blue-text font-bold text-xl">{infoAboutCat?.age}{infoAboutCat?.age == 1 ? " ano" : " anos"} </p>
                            <p className="text-black">Idade</p>
                        </div>
                        <div className="bg-white-background text-black flex flex-col items-center rounded-2xl p-4 h-22 w-24">
                            <p className="text-blue-text font-bold text-xl">{infoAboutCat?.weight} Kg</p>
                            <p className=" text-black l">Peso</p>
                        </div>
                        <div className="bg-white-background flex flex-col items-center rounded-2xl p-4 h-22 w-24">


                            <p className="text-blue-text font-bold text-xl">{infoAboutCat?.sex}</p>
                            <p className="text-black">Sexo</p>
                        </div>
                    </div>

                    <div className="mx-4 py-5">
                        <div className="pb-3">
                            <p className=" text-blue-text font-bold text-xl">Data de entrada: </p>
                            <p className=" text-lg text-black">{infoAboutCat?.entry_date}</p>
                        </div>

                        <div className="pb-3">
                            <p className=" text-blue-text font-bold text-xl">Adotado</p>
                            <p className=" text-lg text-black">{infoAboutCat?.adopted ? "Sim" : "Não"}</p>
                        </div>

                        <div>
                            <p className=" text-blue-text font-bold text-xl">Necessidade de ração</p>
                            <p className=" text-lg text-black">{infoAboutCat?.resource?.food} g</p>
                        </div>

                    </div>

                </div>
            </div>

            <div className="flex items-center justify-center py-6">
                <button className="flex items-center justify-center h-12 rounded-lg w-64  bg-dark-blue text-white-background" onClick={adoptedMe}>{buttonAdopted ? "Meow adotado!" : "Confirmar adoção"}</button>
            </div>

            <div className="h-28">
                <Footer />
            </div>
        </div>
    )
}