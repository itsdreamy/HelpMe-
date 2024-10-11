import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import Preloader from '../../components/Preloader';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Reset message
        
        try {
            const data = await login(username, password);
            
            if (data && data.token) {
                // Jika login berhasil
                navigate('/dashboard');
            } else {
                // Jika login gagal (invalid credentials)
                setMessage('Login gagal! Username atau password salah.');
            }
        } catch (error) {
            // Tangani kesalahan jaringan atau respons lainnya
            setMessage('Terjadi kesalahan! Coba lagi nanti.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}
            <div className="wrapper">
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <PersonIcon className='icon'/>
                        </div>
                        <div className="input-box">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <LockIcon className='icon'/>
                        </div>
                        <div className="remember-forgot">
                            <a href="/forgotpassword">Forgot Password</a>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <p className='text-center'>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
