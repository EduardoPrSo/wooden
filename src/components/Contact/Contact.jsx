import styles from './Contact.module.css';
import { useState } from 'react';
import { motion } from 'framer-motion';


export default function Contact () {

    const [emailAlert, setEmailAlert] = useState(false);
    const [emailAlertTitle, setEmailAlertTitle] = useState();

    async function sendEmail(e) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            accessKey: "f34d3d8b-268f-403d-a429-bf095bcc78b5",
        }
        if (body.email === "" || body.name === "" || body.message === "") {
            setEmailAlertTitle(<>Preencha todos os campos!</>);
            setEmailAlert(true);
            setTimeout(() => setEmailAlert(false), 2000);
            return;
        }
        try {
            const response = await fetch("https:/api.staticforms.xyz/submit", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }

        setEmailAlertTitle(<>Email enviado! <i className="fa-sharp fa-solid fa-check"></i></>);
        setEmailAlert(true);
        setTimeout(() => setEmailAlert(false), 2000);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainTitle}>
                <h1>Entre em contato conosco!</h1>
            </div>
            <div className={styles.mainContact}>
                <div className={styles.emailContactContainer}>
                    <h3 style={{color: 'black'}}><i className="fa-sharp fa-solid fa-envelope" style={{color: '#fc8f00'}}></i> Envie um email</h3>
                    <motion.div className={styles.emailAlert} style={{display: emailAlert ? 'flex' : 'none'}}
                        animate={{y: emailAlert ? -30 : -300, opacity: emailAlert ? 1 : 0}}>
                        <h2>{emailAlertTitle}</h2>
                    </motion.div>
                    <form className={styles.emailContact} onSubmit={sendEmail}>
                        <input className={styles.emailContactLabel} type="text" name="name" placeholder="Seu nome" />
                        <input className={styles.emailContactLabel} type="text" name="email" placeholder="Seu Email" />
                        <textarea className={styles.emailContactTextArea} name="message" placeholder="Digite sua mensagem"></textarea>
                        {/* <input type="hidden" name="accessKey" value="f34d3d8b-268f-403d-a429-bf095bcc78b5" /> */}
                        {/* <input type="hidden" name="accessKey" value="8758bd35-2bc6-44e0-87bc-09f680ed2339" /> */}
                        <button className={styles.emailContactSubmit} type="submit">Enviar</button>
                    </form>
                </div>
                <div className={styles.otherContacts}>
                    <div className={styles.allContacts}>
                        <h3 style={{fontSize: '2.2vh'}}><i className="fa-sharp fa-solid fa-phone" style={{color: '#fc8f00'}}></i> Ligue para nós</h3>
                        <p style={{fontSize: '2vh'}}>(41) 9 9264-2454</p>
                    </div>
                    <div className={styles.allContacts}>
                        <h3 style={{fontSize: '2.2vh'}}><i className="fa-sharp fa-solid fa-comment" style={{color: '#fc8f00'}}></i> Nos chame no WhatsApp</h3>
                        <p style={{fontSize: '2vh'}} className={styles.linkButton} onClick={() => {window.open('https://wa.me/5541992642454?text=Olá,%20gostaria%20de%20fazer%20um%20orçamento!', '_blank')}}>Inicie uma conversa</p>
                    </div>
                    <div className={styles.allContacts}>
                        <h3 style={{fontSize: '2.2vh'}}><i className="fa-sharp fa-solid fa-camera" style={{color: '#fc8f00'}}></i> Veja nosso instagram</h3>
                        <p style={{fontSize: '2vh'}} className={styles.linkButton} onClick={() => {window.open('https://www.instagram.com/marcenariawooden/', '_blank')}}>@marcenariawooden</p>
                    </div>
                </div>
            </div>
        </div>
    )
};