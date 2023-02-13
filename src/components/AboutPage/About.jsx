import styles from './AboutPage.module.css'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useRouter } from 'next/router'

export default function AboutPage () {
    const router = useRouter();
    const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleKey
    })

    return (
        <div className={styles.mainContainer}>
            <div className={styles.mainTitle}>
                <h1>Sobre nós</h1>
            </div>
            <div className={styles.aboutContainer}>
                <div className={styles.aboutinfoContainer}>
                    <div className={styles.allContacts}>
                        <h3 style={{fontSize: '2vh'}}><i className="fa-solid fa-location-dot" style={{color: '#fc8f00', marginBottom: '5%'}}></i> Qual nossa localização?</h3>
                        <p style={{fontSize: '1.8vh'}}>Nós estamos localizados em <span style={{color: '#fc8f00'}}>Curitiba</span> no Paraná e trabalhamos com a área de Curitiba e região!</p>
                    </div>
                    <div className={styles.allContacts}>
                        <h3 style={{fontSize: '2vh'}}><i className="fa-solid fa-handshake-angle" style={{color: '#fc8f00', marginBottom: '5%'}}></i> Quem nós atendemos?</h3>
                        <p style={{fontSize: '1.8vh'}}>Nós atendemos tanto pessoa física quanto empresas, então não tenha medo, faça seu <span className={styles.linkButton} onClick={()=>router.push('/contato')}>orçamento</span>!</p>
                    </div>
                    <div className={styles.allContacts}>
                        <h3 style={{fontSize: '2vh'}}><i className="fa-solid fa-chair" style={{color: '#fc8f00', marginBottom: '5%'}}></i> Qual a nossa área?</h3>
                        <p style={{fontSize: '1.8vh'}}>Nós trabalhamos com <span  style={{color: '#fc8f00'}}>MDF e móveis planejados</span>, sempre com cuidado e qualidade!</p>
                    </div>
                </div>
                <div className={styles.mapContainer}>
                    {isLoaded && <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100%', borderRadius: '5px'}}
                        center={{
                            lat: -25.4415903,
                            lng: -49.2320057,
                        }}
                        zoom={11}
                    />}
                </div>
            </div>
        </div>
    )
}