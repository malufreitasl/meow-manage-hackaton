import { Inter } from "next/font/google";
// import Link from 'next/link';
import { useEffect, useState } from "react";
import { motion } from "framer-motion"


const inter = Inter({ subsets: ["latin"] });


const arrayDeMentira = [
  {
    "id": 1,
    "nome": "gabi"
  },
  {
    "id": 2,
    "nome": "andre"
  },
  {
    "id": 3,
    "nome": "rio"
  }
]

export default function Home() {
  const [allCats, setAllCats] = useState([]);

  const fetchAllCats = async () => {
    try {
      const response = await fetch('./api/cat'); //inventei
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
    <div className={"h-screen w-screen"}>
      <p>Lista com todos os gatos</p>
      <div className="flex pt-6 gap-6 overflow-auto whitespace-nowrap no-scrollbar  ">
        {arrayDeMentira.map((elemento, index) =>
          <motion.div
            key={index}

            initial={{
              x: -100, // Fora da tela à esquerda
              opacity: 0
            }}
            animate={{
              x: 0, // Move para a posição inicial
              opacity: 1
            }}
            transition={{
              delay: index * 0.15
            }}
          >
            {/* <Link href={`/cats/info?i=${elemento._id}`}> */}
            <div className="flex flex-col">
              <div className="text-black">{elemento.nome}</div>
              <div className="text-black ">{elemento.id}</div>



            </div>
            {/* </Link> */}
          </motion.div>
        )}
      </div>


    </div>
  );
}
