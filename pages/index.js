import { downloadIMG} from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import style from '../styles/Home.module.css'

export default function Home() {

  const { image, setUserImage } = useUser()

  useEffect(() => {
    image == null ? downloadIMG(setUserImage): ''
  }, [image]);
  return (
    <>
    {image == null ? <Loader /> : <img src={image} className={style.img} alt="img" />}
    </> 
  )
}
