import Link from "next/link";

export default function InfoCat() {
    return (
        <div>
            <Link href="./listaanimais">LISTA ANIAMAIS</Link>
            <div className="h-80">
                SLFNGOENGOIWN
            </div>

            <div className="bg-neutral-100 rounded-3xl h-auto ">

                <div className="flex justify-center items-center h-24 text-4xl ">
                    <p>Tobias</p>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <div className="bg-neutral-300 flex flex-col items-center rounded-2xl p-4 h-24 w-24">
                            <p className="text-xl">5 anos</p>
                            <p>Idade</p>
                        </div>
                        <div className="bg-neutral-300 flex flex-col items-center rounded-2xl mx-6 p-4 h-24 w-24">
                            <p className="text-xl">3.5Kg</p>
                            <p>Peso</p>
                        </div>
                        <div className="bg-neutral-300 flex flex-col items-center rounded-2xl p-4 h-24 w-24">
                            <p className="text-xl">Feminino</p>
                            <p>Sexo</p>
                        </div>
                    </div>

                    <div className="pl-8 py-8">
                        <div className="pb-3">
                            <p className=" text-xl">Data de entrada</p>
                            <p className=" text-lg">13/04/2022</p>
                        </div>
                        
                        <div className="pb-3">
                            <p className=" text-xl">Adotado</p>
                            <p className=" text-lg">Não</p>
                        </div>

                        <div>
                            <p className=" text-xl">Necessidade de ração</p>
                            <p className=" text-lg">0.5KG / Dia</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}