import styles from './AdminPage.module.css';
import AdminCarousel from '../AdminCarousel/AdminCarousel';
import AdminProducts from '../AdminProducts/AdminProducts';

export default function AdminPage ({images}) {
    console.log(images)
    return (
        <div className={styles.mainContainer}>
            <AdminCarousel carouselImages={images}/>
            <AdminProducts/>
        </div>
    )
}