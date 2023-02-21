import styles from './Partners.module.css'

export default function Partners() {
    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.mainTitle}>OPÇÕES DE ACESSÓRIOS</h2>
            <div className={styles.classContainer}>
                <div className={styles.itemContainer}>
                    <img src="/partners/batedor_porta.png" />
                    <p>Batedor de Porta</p>
                </div>
                <div className={styles.itemContainer}>
                    <img src="/partners/braço.png" />
                    <p>Suporte Articulado</p>
                </div>
                <div className={styles.itemContainer}>
                    <img src="/partners/cabideiro.png" />
                    <p>Cabideiro Retráril</p>
                </div>
                <div className={styles.itemContainer}>
                    <img src="/partners/fechadura.png" />
                    <p>Fechadura Eletrônica</p>
                </div>
            </div>
        </div>
    )
}