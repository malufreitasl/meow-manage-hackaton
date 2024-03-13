import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from 'moment';

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
            console.log
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
        <div className="h-screen w-screen">
            <div className="flex flex-col gap-7 h-screen w-screen justify-center items-center">
                <div><p className="text-4xl">Recursos</p></div>
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
                        <div className="flex flex-col bg-zinc py-4 px-5 rounded-lg w-80">
                            <div className="text-black text-center text-lg font-bold">{resource.name}</div>
                            <div className="flex justify-between">
                                <div className="text-black">Qty: {resource.quantity} {resource.unity}</div>
                            </div>
                            <div >Previsão: {resource.name === "Água" ?
                                    ( resource.quantity / requiredQuantity.totalWater).toFixed(0) :
                                    resource.name === "Areia" ?
                                        ( resource.quantity / requiredQuantity.totalLitter).toFixed(0)  :
                                        ( resource.quantity / requiredQuantity.totalFood).toFixed(0)} Dias restantes</div>
                            <div className="text-sm">Gastos / Dia: {resource.name === "Água" ? requiredQuantity.totalWater : resource.name === "Areia" ? requiredQuantity.totalLitter : requiredQuantity.totalFood} {resource.unity}</div>
                            <div className="text-xs">Data da última alteração {moment(resource.last_update).format('DD/MM/YYYY')}</div>
                            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 justify-end pt-5">
                                <input type="number" id="quantity" name="quantity" className="border rounded-lg w-10 h-8 text-center" />
                                <button onClick={(e) => handleSum(resource.name, e.target.previousSibling.value)}>Adicionar</button>
                                <button onClick={(e) => handleSubtraction(resource.name, e.target.previousSibling.previousSibling.value)}>Remover</button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}