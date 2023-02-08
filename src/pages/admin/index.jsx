import Header from '@/components/Header/Header'
import AdminPage from '@/components/AdminPage/AdminPage'
import Footer from '@/components/Footer/Footer'

import axios from 'axios'

export default function Admin({data}) {
    return (
        <>
            <Header />
            <AdminPage images={data}/>
            {/* <Footer /> */}
        </>
    )
}

export const getServerSideProps = async () => {
    const response = await axios.get('http://localhost:3000/api/carousel_images/getCarouselImages');
    const data = response.data;

    return {
        props: {
            data
        }
    }
}