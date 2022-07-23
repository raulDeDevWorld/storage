import { Children } from 'react'
import Button from '../components/Button'
import style from '../styles/Modal.module.css'

export default function Modal (props) {
    function save (e) {
        e.preventDefault()
        const color = e.target.form[0].value
        const whatsapp = e.target.form[1].value
        const object = { color, whatsapp}

        props.functionSave(object)
    }
    return (
        <>
 <div className={`${style.modalContainer} ${props.mode == false ? style.modalContainerTop: ''} `}>
                <form className={style.modalForm}>
                    <span onClick={props.functionMode} className={style.x}>X</span>
                    <h4>Config Web Page</h4>
                    <label>
                        Color:
                        <input className={style.input} type="text" placeholder="#024164" />
                    </label>
                    <label>
                        WhatsApp:
                        <input className={style.input} type="text" placeholder="https://api.whatsapp.com/send?phone=73447725&text=Hola%20mundo" />
                    </label>
                    <Button style='buttonPrimary' click={save}>Guardar</Button>
                </form>
            </div>
        </>
    )
}