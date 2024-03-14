import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Tarefas() {

    return (
        <div className={"h-screen w-screen pt-32 "}>
            <div>
                <NavBar />
            </div>
            <div className="px-6">
                <BackButton/>
                <h1 className="flex text-3xl pt-3 font-bold text-blue-text items-center pb-7 ">Tarefas</h1>
                <div>
                    <div className="flex gap-4 text-blue-text text-lg pb-6">
                        <label for="date">Data:</label>
                        <input type="date" id="date" name="date" /><br />
                    </div>
                    <div className="flex flex-col gap-2 text-lg pb-4 text-blue-text">
                        <div><input type="checkbox" id="checkbox" name="checkbox" />
                            <label for="checkbox"> Levar a Malu ao veterinário no dia 18/03</label></div>
                        <div><input type="checkbox" id="checkbox" name="checkbox" />
                            <label for="checkbox"> Dar banho ao Chico amanhã</label></div>
                        <div> <input type="checkbox" id="checkbox" name="checkbox" />
                            <label for="checkbox"> Dar banho ao Myke amanhã</label></div>
                        <div>  <input type="checkbox" id="checkbox" name="checkbox" />
                            <label for="checkbox"> Ligar ao eletricista  3333-3434</label></div>
                        <div><input type="checkbox" id="checkbox" name="checkbox" />
                            <label for="checkbox"> Verificar a limpeza dos espaços de convivência dos gatos </label></div>
                        <div>
                            <input type="checkbox" id="checkbox" name="checkbox" />
                            <label for="checkbox"> Verificar se há sinais de doença ou desconforto nos gatos</label></div>










                    </div>

                </div>



            </div>


            <div>
                <Footer />
            </div>

        </div>
    )
}