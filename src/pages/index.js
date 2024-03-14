import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from 'moment';
import ReactSpeedometer from "react-d3-speedometer";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Resources() {
    const [allResources, setAllResources] = useState([]);
    const [requiredQuantity, setRequiredQuantity] = useState({});

    const fetchAllResources = async () => {
        try {
            const response = await fetch('./api/resource/');
            if (!response.ok) {
                throw new Error('Fail to fetch all resources data');
            }
            const data = await response.json();
            setAllResources(data);
        } catch (error) {
            console.error('Fail to fetch all resources data:', error);
        }
    };

    const fetchRequiredQuantity = async () => {
        try {
            const response = await fetch('./api/cat/required-resources');
            if (!response.ok) {
                throw new Error('Fail to fetch all resources data');
            }
            const data = await response.json();
            setRequiredQuantity(data);
        } catch (error) {
            console.error('Fail to fetch all resources data:', error);
        }
    };

    useEffect(() => {
        fetchAllResources();
        fetchRequiredQuantity();
    }, []);

    const handleSum = async (name, quantity) => {
        try {
            const response = await fetch('/api/resource/add', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, quantity: quantity })
            })
            if (!response.ok) {
                throw new Error('Fail to fetch add resource data');
            }
            fetchAllResources();
        } catch (error) {
            console.error('Fail to fetch add resource data:', error);
        }
    }

    const handleSubtraction = async (name, quantity) => {
        try {
            const response = await fetch('/api/resource/remove', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, quantity: quantity })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch remove resource data');
            }

            fetchAllResources();
        } catch (error) {
            console.error('Failed to fetch remove resource data:', error);
        }
    }


    return (
        <div className="h-screen w-screen text-blue-text">
            <NavBar/>
            <div className="flex flex-col gap-5 pb-32">
                <div><p className="text-3xl font-semibold px-6 pt-32">Gestão dos Recursos</p></div>
                {allResources.map((resource, index) =>
                    <motion.div
                        initial={{
                            y: 100,
                            scale: 1,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            scale: 1,
                            opacity: 1
                        }}
                        transition={{
                            delay: index * 0.15
                        }}
                        key={index}
                    >
                        <div className={`flex flex-col py-4 px-4 rounded-lg mx-6 gap-5 justify-center ${resource.name === "Areia"? "bg-yellow-card": resource.name === "Água"? "bg-blue-card": "bg-pink-card"}`}>
                            <div className="text-blue-text center text-lg font-bold">{resource.name}</div>
                            <div className="flex justify-between items-center">
                                <div className="text-5xl ">{resource.quantity} {resource.unity}</div>
                                <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                                    <input type="number" id="quantity" name="quantity" className="rounded-2xl w-14 h-13 text-center text-sm " placeholder="quant"/>
                                    <div className="flex flex-col gap-1">
                                    <button className="bg-dark-blue text-white-background rounded-lg px-2" onClick={() => handleSum(resource.name, document.getElementById('quantity').value)}>Adicionar</button>
                                    <button className="bg-dark-blue text-white-background rounded-lg px-2" onClick={() => handleSubtraction(resource.name, document.getElementById('quantity').value)}>Remover</button>
                                    </div>
                                </form>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                <div className="bg-white-background rounded-lg px-2 text-sm"> Previsão: {resource.name === "Água" ?
                                    (resource.quantity / requiredQuantity.totalWater === 1 ? "1 dia restante" : `${(resource.quantity / requiredQuantity.totalWater).toFixed(0)} dias restantes`) :
                                    resource.name === "Areia" ?
                                        (resource.quantity / requiredQuantity.totalLitter === 1 ? "1 dia restante" : `${(resource.quantity / requiredQuantity.totalLitter).toFixed(0)} dias restantes`) :
                                        (resource.quantity / requiredQuantity.totalFood === 1 ? "1 dia restante" : `${(resource.quantity / requiredQuantity.totalFood).toFixed(0)} dias restantes`)
                                }</div>
                                <div className="bg-white-background rounded-lg px-2 text-sm">Gastos / Dia: {resource.name === "Água" ? requiredQuantity.totalWater : resource.name === "Areia" ? requiredQuantity.totalLitter : requiredQuantity.totalFood} {resource.unity}</div>
                            </div>
                            <div className="flex flex-col items-center justify-center pt-2">
                                <ReactSpeedometer className=" self-center justify-self-center" 
                                    value={resource.name === "Água" ?
                                        Number(resource.quantity / requiredQuantity.totalWater).toFixed(0) :
                                        resource.name === "Areia" ?
                                          Number(resource.quantity / requiredQuantity.totalLitter).toFixed(0) :
                                          Number(resource.quantity / requiredQuantity.totalFood).toFixed(0)
                                        } 
                                        maxValue={10} 
                                        segments={5} 
                                        height={125} 
                                        width={200}
                                        segmentColors={[
                                            "#bf616a",
                                            "#d08770",
                                            "#ebcb8b",
                                            "#57A773",
                                            "#B5EF8A",
                                          ]}
                                        />
                            </div>
                            <div className="text-gray-text rounded-lg px-2 text-xs justify-self-end self-end">Data da última alteração: {moment(resource.last_update).format('DD/MM/YYYY HH:mm')}</div>
                        </div>
                    </motion.div>
                )}
            </div>
            <Footer/>
        </div>
    );
}