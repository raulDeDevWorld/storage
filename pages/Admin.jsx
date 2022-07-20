import { handleSignOut, uploadIMG, downloadIMG} from '../firebase/utils'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Modal from '../components/Modal'
import Error from '../components/Error'
import Success from '../components/Success'
import style from '../styles/Admin.module.css'

function Admin() {
    const { user, setUserData, setUserSuccess, image, setUserImage, success } = useUser()
    const [file, setFile] = useState(false)

    const router = useRouter()

    function fileHandler (e) {
        e.preventDefault()
        const data = e.target.files[0]
        setFile(data)
    }
    function UploadFirebaseStorage (e) {
        e.preventDefault()
        uploadIMG(file)
        downloadIMG(setUserImage)
    }
    function nav(e) {
        e.preventDefault()
        router.push('/')
    }
    function signOut(e) {
        e.preventDefault()
        handleSignOut()
    }
    useEffect(() => {
        image==null ? downloadIMG(setUserImage): ''
      }, [image]);
    return (
        <div className={style.container}>
                <br />
                <form className={style.form} onSubmit={UploadFirebaseStorage}>
                    <input type="file"  onChange={fileHandler} accept="images/*" />
                    <button className={style.add}>subir img</button> 
                </form>
                <div className={style.imgContainer}>
                    <p>Imagen Actual</p>
                    <img src={image} alt="" className={style.img}/>
                </div><br />
                <div>
                    <button className={style.logout} onClick={nav}>Pag Principal</button>
                    <button className={style.logout} onClick={signOut}>Cerrar Sesión</button>
                </div>
                <br />
                  {success == 'save' && <Success>Correcto</Success>}
        </div>
    )
}

export default WithAuth(Admin) 