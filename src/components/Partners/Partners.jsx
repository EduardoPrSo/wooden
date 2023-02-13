import styles from './Partners.module.css'

export default function Partners() {
    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>NOSSOS FORNECEDORES</h2>
            <div className={styles.classContainer}>
                <img src="/images/wobg.png" />
                <img src="/images/wobg.png" />
            </div>
            <div className={styles.classContainer}>
                <img src="/images/wobg.png" />
                <img src="/images/wobg.png" />
                <img src="/images/wobg.png" />
            </div>
        </div>
    )
}