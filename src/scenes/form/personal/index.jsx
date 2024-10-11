import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../../components/Preloader';
import { useStoreProblem } from '../../../api/problemApi'; // Import the custom hook
import { Snackbar, Alert } from '@mui/material';

const NewPersonal = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    // Using the custom hook
        const { storeProblem, alert, handleCloseAlert } = useStoreProblem();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await storeProblem(name, 'personal');
        setLoading(false);

        if (data) {
            // Show the alert and then navigate after 3 seconds
            setTimeout(() => {
                navigate('/personal');
            }, 1500);
        }
    };

    return (
        <div className="problems">
            {loading && <Preloader loading={loading} />} {/* Show preloader if loading */}
            <form onSubmit={handleSubmit}>
                <h1 className='problem-title'>Add New Problem for Personal</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Add Your Problem Here!"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn">Create</button>
            </form>

            {/* Snackbar for alerts positioned at the top right */}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position the Snackbar
            >
                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default NewPersonal;
