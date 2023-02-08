import styles from './AdminPage.module.css';
import AdminCarousel from '../AdminCarousel/AdminCarousel';
import AdminProducts from '../AdminProducts/AdminProducts';

export default function AdminPage ({carouselImages}) {
    return (
        <div className={styles.mainContainer}>
            <AdminCarousel carouselImages={carouselImages}/>
            <AdminProducts/>
        </div>
    )
}