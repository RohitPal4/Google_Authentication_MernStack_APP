import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../api/api.js';
import {useNavigate} from 'react-router-dom';
import loginImg from '../assets/login.png';
import '../styles/GoogleLogin.css';

const GoogleLogin = () => {
    
    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                // Send the authorization code to your backend
                const result = await googleAuth(authResult['code']);
                const { email, name, image } = result.data.user;
                const token = result.data.token;
                const obj = {email, name, image, token};
                localStorage.setItem('user-info', JSON.stringify(obj));
                console.log('User Data:', result.data.user);
                console.log(token);
                navigate('/dashboard');
            }
        } catch (err) {
            console.log("Error while requesting Google code:", err);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle, // Triggered when the flow succeeds
        onError: (error) => {
            console.log("Google Login Error:", error);
        },
        flow: 'auth-code', // Use the authorization code flow
    });

    return (
        <div className="login-container">
            <img src={loginImg} alt="login" className="login-image" />
            <button onClick={googleLogin} className="login-button">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google Logo"
                />
                Login With Google
            </button>
        </div>
    );
};

export default GoogleLogin;