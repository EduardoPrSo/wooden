import styles from './AdminLogin.module.css';
import axios from 'axios'

export default function AdminLogin ({onLogin}) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/auth/login', {
                username: document.querySelector('#loginUsername').value,
                password: document.querySelector('#loginPassword').value
            });
            if (response.data.message === 'success') {
                onLogin();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
    )
}