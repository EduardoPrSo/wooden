import styles from './Product.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Product() {
    const router = useRouter();
    
    const [CarouselItems, setCarouselItems] = useState(null);
    const [InfoItem, setInfoItem] = useState(null);

    useEffect(()=>{
        if(!router.isReady) return;
        const { id } = router.query;

        const products = {
            teste1: {
                images: [
                    'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a9574486056275a625a644_home-about-01.webp',
                    'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a95744f1c7f699c2e70106_home-about-02-p-1080.webp',
                    'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a95744f1c7f699c2e70106_home-about-02-p-1080.webp'
                ],
                title: 'Título do produto 1',
                description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                categhory: 'Cozinha',
                date: '3 meses',
                material: 'MDF Cinza 18mm'
            },
            teste2: {
                images: [
                    'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a9574486056275a625a644_home-about-01.webp',
                    'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a95744f1c7f699c2e70106_home-about-02-p-1080.webp',
                    'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a95744f1c7f699c2e70106_home-about-02-p-1080.webp'
                ],
                title: 'Título do produto 1',
                description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                categhory: 'Cozinha',
                date: '01/01/2021',
                material: 'MDF Cinza 18mm'
            }
        }
    
        const productImagesArray = Object.values(products[id].images);
    
        setCarouselItems(productImagesArray.map((product, index) => (
            <div key={index}>
                <img
                    style={{ width: '85%', margin: 0}}
                    src={product}
                />
            </div>
        )));
    
        const productData = Object.assign({}, products[id]);
        delete productData.images;
        const infoFiltered = [productData];
    
        setInfoItem(infoFiltered.map((product, index) => (
            <div key={index} className={styles.infoContent}>
                <h1 style={{color: '#fc8f00'}}>{product.title}</h1>
                <p style={{borderBottom: '2px solid black', paddingBottom: '5%', height: '485px'}}>{product.description}</p>
                <div className={styles.moreInfo}>
                    <div className={styles.productInfo}>
                        <h3 style={{marginBottom: '5%', color: '#fc8f00'}}>Categoria</h3>
                        <p>{product.categhory}</p>
                    </div>
                    <div className={styles.productInfo}>
                        <h3 style={{marginBottom: '5%', color: '#fc8f00'}}>Prazo</h3>
                        <p>{product.date}</p>
                    </div>
                    <div className={styles.productInfo}>
                        <h3 style={{marginBottom: '5%', color: '#fc8f00'}}>Material</h3>
                        <p>{product.material}</p>
                    </div>
                </div>
            </div>
        )));
    }, [router.isReady]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productContainer}>
                <div className={styles.carouselContainer}>
                    <Carousel className={styles.carouselStyle} style={{margin: 0}} showStatus={false} showArrows={false} autoPlay={false}>
                        {CarouselItems}
                    </Carousel>
                </div>
                <div className={styles.infoContainer}>
                    {InfoItem}
                </div>
            </div>
        </div>
    )
}