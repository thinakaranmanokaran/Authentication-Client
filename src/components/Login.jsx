import { useState } from 'react';
import axios from 'axios';
import AlertBox from './AlertBox'; // Ensure the path to AlertBox is correct

const Login = ({ toggleRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(''); // Alert message
    const [showAlert, setShowAlert] = useState(false); // Control alert visibility
    const [isConfirmation, setIsConfirmation] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    
            // If login is successful
            if (response.status === 200) {
                setAlertMessage("Login successful. You are a registered user.");
                setShowAlert(true); 
            }
        } catch (error) {
            // Display backend error messages
            if (error.response && error.response.status === 400) {
                setAlertMessage(error.response.data.message); // Show specific error message from backend
            } else {
                setAlertMessage("An error occurred. Please try again."); // Generic error for server issues
                setShowAlert(true); 
            }
            setShowAlert(true); // Show the alert box
        }
    };
    
    return (
        <div className='flex space-x-4 h-full justify-center items-center'>
            {/* AlertBox for showing messages */}
            {showAlert && 
                <AlertBox 
                    message={alertMessage} // The alert message to display
                    type={isConfirmation ? "confirm" : "alert"}
                    onCancel={() => setShowAlert(false)} // Close alert on cancel
                    onConfirm={() => setShowAlert(false)} // Close alert on confirm
                />
            }
            
            <form onSubmit={handleSubmit} className="w-auto px-10 bg-[#ffffff30] backdrop-blur-2xl py-20 rounded-2xl space-y-4 flex flex-col justify-center items-center">
                <h1 className='text-5xl text-[#191919] -translate-y-8 font-justsans'>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 w-full rounded-xl border-0 focus:outline-none pl-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 w-full rounded-xl border-0 focus:outline-none pl-4"
                    required
                />
                <div className='flex justify-between space-x-4 w-full -translate-y-2'>
                    <a href="#" onClick={toggleRegister} className='hover:underline transition-all text-sm'>Don't have an Account?</a>
                    <a href="#" className='hover:underline transition-all text-sm'>Forget Password?</a>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 px-20 rounded-full">Login</button>
                <div className='flex space-x-1 translate-y-6'>
                    <div className='bg-white w-3 h-3 rounded-full'></div>
                    <div className='bg-white w-3 h-3 rounded-full'></div>
                </div>
            </form>
        </div>
    );
};

export default Login;
