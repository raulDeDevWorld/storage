import { downloadIMG} from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import style from '../styles/Home.module.css'

export default function Home() {

  const { userDB, image, setUserImage } = useUser()

  useEffect(() => {
    image == null ? downloadIMG(setUserImage): ''
  }, [image]);
  return (
    <div style={{  backgroundColor: `${userDB.color}`, minHeight: "100vh"}}>
    {image == null ? <Loader /> : <img src={image} className={style.img} alt="img" />}
    {userDB && <img src="/whatsapp.svg" className={style.whatsapp} alt="Whatsapp" />}
    </div> 
  )
}
