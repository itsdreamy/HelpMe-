import React, { useState } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Preloader from '../../components/Preloader';
import { resetPassword } from '../../api/authApi';

const Newpass = () => {
    const [ loading, setLoading ] = useState(false);
    const [ password, setPassword ]  = useState('');
    const [ confirmPassword, setConfirmPassword ]  = useState(''); 
    const [ message, setMessage ] = useState(''); 
    const { token } = useParams();
    const query = new URLSearchParams(useLocation().search);
    const phone_number = query.get('phone_number');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const data = await resetPassword(token, phone_number, password, confirmPassword);
        
        setLoading(false);

        if (data && data.status === 200) {  // Jika response berhasil (200)
            setMessage('Password berhasil di reset, silahkan login');
            navigate('/success');
        } else if (data && data.status === 422) {  // Jika API gagal
            const messages = data.response.data.errors.password
            setMessage('Error: ' + messages[0]);
        } else {  // Jika password confirmation tidak cocok atau masalah lain
            console.log(data);
            setMessage('Link kaldaluarsa, silahkan minta link kembali');
        }
    };

    return (
        <div className="container">
        {loading && <Preloader loading={loading} />} {/* Show preloader if loading */ }
        <div className="wrapper">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h2 className='title'>Insert New Password</h2>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <LockIcon className='icon'/>
                    </div>
                    <h2 className='title'>Confirm New Password</h2>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <LockIcon className='icon'/>
                    </div>
                    <button type="submit" className="btn">Change</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Newpass;
