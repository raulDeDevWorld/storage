import { downloadIMG} from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { useEffect } from 'react'
import Image from 'next/image'
import style from '../styles/Home.module.css'

export default function Home() {

  const { image, setUserImage } = useUser()

  useEffect(() => {
    image==null ? downloadIMG(setUserImage): ''
  }, [image]);
  return (
    <div >
      <img src={image} className={style.img} alt="img" />
    </div>
  )
}
