import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Preloader from '../../components/Preloader';
import { resetPassword } from '../../api/authApi';

export default function NewPass() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const phone_number = query.get('phone_number');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = await resetPassword(token, phone_number, password, confirmPassword);
    setLoading(false);

    if (data && data.status === 200) {
      setMessage('Password successfully reset, please log in.');
      navigate('/success');
    } else if (data && data.status === 422) {
      const messages = data.response.data.errors.password;
      setMessage('Error: ' + messages[0]);
    } else {
      setMessage('Link expired, please request a new one.');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f5f5f5] px-4">
      {loading && <Preloader loading={loading} />}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-6 sm:p-10 shadow-lg rounded-lg flex flex-col">
        <div className="w-full flex flex-col">
          <div className="flex flex-col mb-10 text-center">
            <h3 className='text-2xl sm:text-3xl font-semibold mb-2'>Reset Password</h3>
            <p className='text-base mb-2'>Please enter your new password!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <input
                placeholder='New Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                required
              />
            </div>
            <div className="w-full flex flex-col">
              <input
                placeholder='Confirm Password'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                required
              />
            </div>

            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white bg-[#0d0d0d] rounded-md p-4 text-center flex items-center justify-center"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
          {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
