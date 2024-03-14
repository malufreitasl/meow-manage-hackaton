import { useRouter } from 'next/router'
import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => router.back()}>
      <FaArrowLeft className='text-dark-blue'/>
    </button>
  )
}