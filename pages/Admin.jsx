import { handleSignOut, uploadIMG, downloadIMG} from '../firebase/utils'
import { writeUserData} from '../firebase/database'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Button from '../components/Button'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Modal from '../components/Modal'
import Error from '../components/Error'
import Success from '../components/Success'
import style from '../styles/Admin.module.css'

function Admin() {
    const { user, userDB, setUserData, setUserSuccess, image, setUserImage, success } = useUser()
    const [file, setFile] = useState(false)
    const [mode, setMode] = useState(false)

    const router = useRouter()

    function fileHandler(e) {
        e.preventDefault()
        const data = e.target.files[0]
        setFile(data)
    }
    function UploadFirebaseStorage(e) {
        e.preventDefault()
        if (file !== false) {
            uploadIMG(file, setUserImage, setUserSuccess)
            setUserSuccess(true)
        } else {
            setUserSuccess(false)
        }
    }
    function nav(e) {
        e.preventDefault()
        router.push('/')
    }
    function signOut(e) {
        e.preventDefault()
        handleSignOut()
    }
    function showModal() {
        setMode(!mode)
    }
 
    function saveDataModal(object) {
        writeUserData(object, setUserSuccess)
    }
    console.log(userDB)
    useEffect(() => {
        image == null ? downloadIMG(setUserImage) : ''
    }, [image, success]);
    return (
        <div className={`${style.container} ${mode && style.dark}`}>
            {success == false && <Error>Seleccione un archivo</Error>}
            {success == true && <Success>Actualizando...</Success>}
            {success == 'error' && <Error>ERROR! intentelo otra vez...</Error>}
            {success == 'save' && <Success>Se guardaron los cambios</Success>}
            {success == 'repeat' && <Error>ERROR! intentelo otra vez...</Error>}
            <img src="/config.svg" onClick={showModal} className={style.config} alt="config" />
            <form className={style.form} onSubmit={UploadFirebaseStorage}>
                <input type="file" className={style.inputFile} onChange={fileHandler} accept="images" />
                <button className={style.add}>Actualizar</button>
            </form>
            <div>
                <p className={style.text}>Imagen Actual</p>
                <div className={style.imgContainer}>
                    <img src={image} alt="" className={style.img} />
                </div>
            </div>
            <div className={style.buttonsContainer}>
                <button className={style.logout} onClick={signOut}>Cerrar Sesión</button>
                <button className={style.nav} onClick={nav}>Pag Principal</button>
            </div>
            {<Modal mode={mode} functionMode={showModal} functionSave={saveDataModal} userDB={userDB} />}
        </div>
    )
}

export default WithAuth(Admin) 
