import styles from './Footer.module.css'
import Image from 'next/image'
import Logo from '../../../public/images/wobg.png'

export default function Footer() {
    return (
        <>
            <div className={styles.classContainer}>
                <Image src={Logo} alt="Logo Wooden" height={80} width={200}/>
            </div>
        </>
    )
}