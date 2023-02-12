import styles from './AdminLogin.module.css';
import Header from '@/components/Header/Header';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

export default function AdminLogin () {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: document.querySelector('#loginUsername').value,
                    password: document.querySelector('#loginPassword').value
                })
            })
            const data = await response.json();
            if (data.message === 'success') {
                setCookie(null, 'IS_LOGGED_WOODEN_ADMIN', true, {
                    path: '/',
                    maxAge: 86400
                })
                router.push('/admin');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.loginContainer}>
                    <h2>Login</h2>
                    <form>
                        <input type="text" id="loginUsername" placeholder="Usuário"/>
                        <input type="password" id="loginPassword" placeholder="Senha"/>
                        <button onClick={handleSubmit}>Entrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}