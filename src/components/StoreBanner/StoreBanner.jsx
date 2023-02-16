import styles from './StoreBanner.module.css';

export default function StoreBanner() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.blurContainer}></div>
            <div className={styles.storeContent}>
                <img onClick={()=>window.open('https://dudustore2.catalog.yampi.io/', '_blank')} src="/images/woodenStore.png" alt="Wooden Store" />
                <p><span onClick={()=>window.open('https://dudustore2.catalog.yampi.io/', '_blank')} className={styles.redirectButton} style={{color: '#fc8f00'}}>Clique Aqui</span> e veja nossos produtos na <span style={{color: '#fc8f00'}}>Wooden Store</span>!</p>
            </div>
        </div>
    )
}