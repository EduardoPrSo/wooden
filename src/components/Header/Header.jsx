import React, { useState, useEffect } from "react";
import Link from 'next/link';
import styles from './Header.module.css'
import Image from 'next/image'
import Logo from '../../../public/images/wobg.png'
import { useRouter } from "next/router";

export default function Header() {
    const router = useRouter();
    const [scrollY, setScrollY] = useState(0);
    const [menu, setMenu] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.classContainer} style={windowWidth > 900 ? {borderBottom: scrollY > 50 ? "1px solid #fc8f00" : "none", trasition: "border-bottom 1s ease-in-out", boxShadow: scrollY > 50 ? '5px 5px 20px #808080' : 'none'} : {}}>
                <div className={styles.dropdownContainer} style={windowWidth > 900 ? {display: scrollY > 50 ? "block" : "none", trasition: "display 1s ease-in-out"} : {}}>
                    <p className={styles.dropdownIcon} onClick={()=> windowWidth < 900 && setMenu(!menu)}><i className="fa-solid fa-bars"></i></p>
                    <div className={styles.dropdown} style={windowWidth < 900 ? {transform: !menu ? 'translateX(-100%)' : 'translateX(+10%)', transition: 'transition: .3s'} : {}}>
                        <p onClick={()=>{setMenu(!menu);router.push('/')}}><i className="fa-solid fa-house"></i> Home</p>
                        <p onClick={()=>{setMenu(!menu);router.push('/trabalhos')}}><i className="fa-solid fa-chair"></i> Trabalhos</p>
                        <p onClick={()=>{setMenu(!menu);router.push('/sobre')}}><i className="fa-solid fa-address-card"></i> Sobre</p>
                    </div>
                </div>
                <Image onClick={()=>{router.push('/')}} src={Logo} alt="Logo Wooden" height={80} width={200}/>
                <p style={windowWidth > 900 ? {display: scrollY > 50 ? "block" : "none", trasition: "display 1s ease-in-out"} : {}} onClick={()=>{router.push('/contato')}} className={styles.headerIcons}><i className="fa-solid fa-phone"></i></p>
            </div>
            <div className={styles.options}>
                <p onClick={()=>{router.push('/')}}>Home</p>
                <p onClick={()=>{router.push('/trabalhos')}}>Trabalhos</p>
                <p onClick={()=>{router.push('/contato')}}>Contato</p>
                <p onClick={()=>{router.push('/sobre')}}>Sobre</p>
            </div>
        </>
    )
}