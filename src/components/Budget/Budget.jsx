import styles from './Budget.module.css'
import { useRouter } from 'next/router'

export default function Budget() {
    const router = useRouter();
    return (
        <div className={styles.mainContainer}>
            <div className={styles.blurContainer}></div>
            <div className={styles.budgetContent}>
                <h1 style={{color: 'white'}} onClick={()=>router.push('/contato')}>Clique aqui!</h1>
                <p>E fale conosco para fazer seu orçamento <span style={{color: 'white'}}>agora!</span></p>
            </div>
        </div>
    )
}