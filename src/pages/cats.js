import Link from 'next/link';
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [allCats, setAllCats] = useState([]);

  const fetchAllCats = async () => {
    try {
      const response = await fetch('./api/cat');
      if (!response.ok) {
        throw new Error('Fail to fetch all cats data');
      }
      const data = await response.json();
      setAllCats(data);
    } catch (error) {
      console.error('Fail to fetch all cats data:', error);
    }
  };

  useEffect(() => {
    fetchAllCats();
  }, []);

  return (

    <div className={"h-screen w-screen pt-32 "}>
      <NavBar/>
      <p className="flex text-3xl mx-6 font-bold text-blue-text items-center pb-7 ">Nossos gatos</p>
      <div className="flex flex-col gap-6 overflow-auto whitespace-nowrap no-scrollbar ">
        {allCats.map((elemento, index) =>
          <motion.div
            key={index}
            initial={{
              x: -100, 
              opacity: 0
            }}
            animate={{
              x: 0, 
              opacity: 1
            }}
            transition={{
              delay: index * 0.15
            }}
          >
            <Link href={`/cats/${elemento._id}`} className="flex px-6 " >
              <div className="flex flex-col py-4 bg-light-blue h-96 w-full rounded-lg px-4">
                <div
                  style={{
                    backgroundImage: `url(${elemento.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="flex h-44 "
                >

                </div>
               <div className="flex flex-col gap-1 py-6">
                  <div className="text-blue-text text-3xl font-medium mt-4 pb-4">{elemento.name}</div>
                  <div className="flex gap-3">
                    <div className=" py-1 px-2.5 text-gray-text bg-white-background rounded-lg">{elemento.age} anos</div>
                    <div className=" py-1 px-2.5 text-gray-text bg-white-background rounded-lg">{elemento.weight} kg</div>
                    <div className=" py-1 px-2.5 text-gray-text bg-white-background rounded-lg">{elemento.adopted ? "Meow adotado!": "Não adotado"}</div>
                  </div>
                  <div className="flex justify-normal py-1 px-2.5 text-gray-text bg-white-background w-56 rounded-full">Data de entrada: {elemento.entry_date}</div>
              </div>
              </div>

            </Link>
          </motion.div>
        )}
      </div>
      <div className="h-40">
        <Footer/>
      </div>
    </div>
  );


}
