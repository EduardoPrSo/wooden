import styles from './AdminPage.module.css';
import AdminCarousel from '../AdminCarousel/AdminCarousel';
import AdminProducts from '../AdminProducts/AdminProducts';
import { useEffect, useState } from 'react';

export default function AdminPage ({items: {carouselImages, products}}) {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    return (
        <div className={styles.mainContainer} style={windowWidth < 900 ? {alignItems: 'center', textAlign: 'center'} : {}}>
            {windowWidth > 900 ? 
            <>
                <AdminCarousel carouselImages={carouselImages}/>
                <AdminProducts products={products}/>
            </> : 
            <h1>Use o Admin no computador!!!</h1>}
        </div>
    )
}