import Footer from '@/components/Footer'
import Image from 'next/image'
import { motion } from "framer-motion";
import NavBar from '@/components/NavBar';

export default function Resources() {
    return (
        <>
            <div className="w-screen h-screen text-blue-text">
                <NavBar/>
                <div className='flex flex-col items-center justify-center h-full'>
                    <motion.div
                          animate={{ y: [100, 0] }}
                        className='flex flex-col items-center justify-center gap-7 bg-pink-card py-10 px-12 rounded-lg'>
                        <div>
                            <Image src="/emma.png" width={200} height={200}  className='rounded-full'/>
                        </div>
                        <div className='flex flex-col gap-2 text-center'>
                            <p className='text-4xl font-semibold pb-4'>Emma</p>
                            <p className='bg-white py-2 px-4 rounded-lg'>Administradora de gatil</p>
                            <p className='bg-white py-2 px-4 rounded-lg'>33 anos</p>
                        </div>
                    </motion.div>
                </div>
                <Footer/>
            </div>
        </>
    )
}
