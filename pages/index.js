import { downloadIMG} from '../firebase/utils'
import { useUser } from '../context/Context.js'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import style from '../styles/Home.module.css'

function Home() {

  const { userDB, image, setUserImage } = useUser()
  console.log(userDB)
  useEffect(() => {
    image == null ? downloadIMG(setUserImage): ''
  }, [userDB, image]);
  return (
    <div style={{  backgroundColor: `${userDB.color}`, minHeight: "100vh"}}>
    {image == null ? <Loader /> : <img src={image} className={style.img} alt="img" />}
    {userDB.whatsapp && <img src="/whatsapp.svg" className={style.whatsapp} alt="Whatsapp" />}
    </div> 
  )
}
export default WithoutAuth(Home) 