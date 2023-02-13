import React, { useState, useEffect } from "react";
import Link from 'next/link';
import styles from './Header.module.css'
import Image from 'next/image'
import Logo from '../../../public/images/wobg.png'

export default function Header() {
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
    
    const handleClick = () => {
        setMenu(!menu)
    }

    return (
        <>
            <div className={styles.classContainer} style={windowWidth > 900 ? {borderBottom: scrollY > 50 ? "1px solid #fc8f00" : "none", trasition: "border-bottom 1s ease-in-out", boxShadow: scrollY > 50 ? '5px 5px 20px #808080' : 'none'} : {}}>
                <div className={styles.dropdownContainer} style={windowWidth > 900 ? {display: scrollY > 50 ? "block" : "none", trasition: "display 1s ease-in-out"} : {}}>
                    <p className={styles.dropdownIcon} onClick={()=> windowWidth < 900 && handleClick}><i className="fa-solid fa-bars"></i></p>
                    <div className={styles.dropdown} style={windowWidth < 900 ? {transform: menu ? 'translateX(-100%)' : 'translateX(+10%)', transition: 'transition: .5s'} : {}}>
                        <Link href='/' style={{textDecoration: 'none'}} onClick={handleClick}>
                            <p><i className="fa-solid fa-house"></i> Home</p>
                        </Link>
                        <Link href='/trabalhos?page=1' style={{textDecoration: 'none'}} onClick={handleClick}>
                            <p><i className="fa-solid fa-chair"></i> Trabalhos</p>
                        </Link>
                        <Link href='/sobre' style={{textDecoration: 'none'}} onClick={handleClick}>
                            <p><i className="fa-solid fa-address-card"></i> Sobre</p>
                        </Link>
                    </div>
                </div>
                <Image src={Logo} alt="Logo Wooden" height={80} width={200}/>
                <Link href='/contato' style={windowWidth > 900 ? {display: scrollY > 50 ? "block" : "none", trasition: "display 1s ease-in-out"} : {}}>
                    <p className={styles.headerIcons}><i className="fa-solid fa-phone"></i></p>
                </Link>
            </div>
            <div className={styles.options}>
                <Link href='/' style={{textDecoration: 'none'}}>
                    <p>Home</p>
                </Link>
                <Link href='/trabalhos?page=1' style={{textDecoration: 'none'}}>
                    <p>Trabalhos</p>
                </Link>
                <Link href='/contato' style={{textDecoration: 'none'}}>
                    <p>Contato</p>
                </Link>
                <Link href='/sobre' style={{textDecoration: 'none'}}>
                    <p>Sobre</p>
                </Link>
            </div>
        </>
    )
}