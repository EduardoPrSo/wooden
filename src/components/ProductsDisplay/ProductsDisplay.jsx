import styles from './ProductsDisplay.module.css'

export default function ProductsDisplay() {

    const products = [
        {
            url: 'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a9574486056275a625a644_home-about-01.webp',
            title: 'Título do produto 1',
            description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        {
            url: 'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a95744f1c7f699c2e70106_home-about-02-p-1080.webp',
            title: 'Título do produto 2',
            description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        },
        {
            url: 'https://assets.website-files.com/63a809ab6d75bc37eb5aa1b2/63a95744f1c7f699c2e70106_home-about-02-p-1080.webp',
            title: 'Título do produto 3',
            description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
        }
    ]

    const displayProducts = products.map((product, index) => (
        <div key={index} className={styles.productDiv}>
            {index % 2 === 0 ? (
                <>
                    <div className={styles.productImage}>
                        <img src={product.url} alt="" style={{ maxWidth: '30vw', marginBottom: '10%', boxShadow: '5px 5px 10px #808080' }} />
                    </div>
                    <div className={styles.productInfo} style={{width: '30vw', minHeight: '65vh', marginBottom: '5%' }}>
                        <h1 style={{marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{marginBottom: '5%'}}>{product.description}</p>
                        <button className={styles.productButton}>Ver mais</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.productInfo} style={{width: '30vw', minHeight: '65vh', marginBottom: '5%' }}>
                        <h1 style={{textAlign: 'right', marginBottom: '5%'}}>{product.title}</h1>
                        <p style={{textAlign: 'right', marginBottom: '5%'}}>{product.description}</p>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
                            <button className={styles.productButton}>Ver mais</button>
                        </div>
                    </div>
                    <div className={styles.productImage}>
                        <img src={product.url} alt="" style={{ maxWidth: '30vw', marginBottom: '10%', boxShadow: '5px 5px 10px #808080' }} />
                    </div>
                </>
            )}
        </div>
    ));

    return (
      <div className={styles.mainContainer} style={{with: '100vw', display: 'flex'}}>
        <h1>Alguns Trabalhos</h1>
            <div className={styles.productsContainer}>
                <div className={styles.productsRow}>
                    {displayProducts}
                </div>
            </div>
      </div>
  )
}