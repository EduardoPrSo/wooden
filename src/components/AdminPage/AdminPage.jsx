import styles from './AdminPage.module.css';
import AdminCarousel from '../AdminCarousel/AdminCarousel';
import AdminProducts from '../AdminProducts/AdminProducts';

export default function AdminPage ({items: {carouselImages, products}}) {
    return (
        <div className={styles.mainContainer}>
            <AdminCarousel carouselImages={carouselImages}/>
            <AdminProducts products={products}/>
        </div>
    )
}