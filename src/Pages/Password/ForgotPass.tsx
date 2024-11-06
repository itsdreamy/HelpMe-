import React, { useState } from 'react';
import IMG from "../../assets/login.jpg";
import DialpadIcon from '@mui/icons-material/Dialpad'; // Import the icon for phone input
import { forgotPassword } from '../../api/authApi'; // Import your forgotPassword API function
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader'; // Import Preloader component
import { Alert, Button } from '@mui/material'; // Import MUI Alert and Button for messages

const colors = {
  primary: "#060606",
  background: "E0E0E0",
  disabled: "#D9D9D9"
};

export default function ForgotPass() {
  const [loading, setLoading] = useState(false); // State to track loading status
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
  const [message, setMessage] = useState(''); // State for messages (success/error)
  const [success, setSuccess] = useState(false); // State to track success
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Show preloader
    setMessage(''); // Reset message
    setSuccess(false); // Reset success

    try {
      const data = await forgotPassword(phoneNumber); // Call forgot password API
      if (data) {
        setMessage('Reset password link telah dikirim ke email anda. Klik OK untuk kembali login');
        setSuccess(true); // Set success to true
      } else {
        setMessage('Phone Number yang anda masukkan belum terdaftar.'); // Error message
      }
    } catch (error) {
      setMessage('Terjadi kesalahan! Coba lagi nanti.'); // General error message
    } finally {
      setLoading(false); // Hide preloader
    }
  };

  const handleOkClick = () => {
    navigate('/login'); // Navigate to login page when OK button is clicked
  };

  return (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      {/* Left image section */}
      <div className="relative w-full md:w-1/2 h-1/3 md:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col max-w-[550px] p-4 md:p-0">
          <div className="text-3xl md:text-4xl text-white font-extrabold my-4">Can't remember your password?</div>
          <p className='text-lg md:text-xl text-white font-normal'>Don't worry, we'll help you!</p>
        </div>
        <img src={IMG} className="w-full h-full object-cover" alt="Login Background" />
      </div>

      {/* Right form section */}
      <div className="w-full md:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-center p-6 md:p-20">
        <div className="w-full flex flex-col">
          <div className="flex flex-col mb-10">
            <h3 className='text-2xl md:text-3xl font-semibold mb-2'>Forgot Password</h3>
            <p className='text-base mb-2'>Please enter your phone number!</p>
          </div>

          {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}

          {success && ( // Display success alert if the reset was successful
            <Alert 
              severity="success" 
              action={
                <Button color="white" onClick={handleOkClick}>
                  OK
                </Button>
              }
              style={{ marginBottom: '20px' }}
            >
              {message}
            </Alert>
          )}
          {!success && message && ( // Display error message alert if not successful
            <Alert severity="error" onClose={() => setMessage('')} style={{ marginBottom: '20px' }}>
              {message}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <div className="relative">
                <input 
                  placeholder='08xxxxxxxxx' 
                  type="text" 
                  required
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
                />
                <DialpadIcon className='absolute right-2 top-2' /> {/* Dialpad icon */}
              </div>
            </div>

            <div className="w-full flex flex-col my-4">
              <button type="submit" className="w-full text-white bg-[#0d0d0d] rounded-md p-4 text-center flex items-center justify-center">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
