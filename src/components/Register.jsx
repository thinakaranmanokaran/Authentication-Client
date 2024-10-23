import { useState } from 'react';
import axios from 'axios';
import AlertBox from './AlertBox'; // Ensure this path is correct

const Register = ({ toggleRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(''); // For alert/confirmation messages
    const [showAlert, setShowAlert] = useState(false); // Control when alert is visible
    const [isConfirmation, setIsConfirmation] = useState(false); // Differentiate between error and confirmation

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks for missing fields
        if (!name) {
            setAlertMessage('Oops! You missed the Name box. Please fill it out.');
            setShowAlert(true); // Show alert for missing Name
            return;
        } else if (!email) {
            setAlertMessage('Oops! You missed the Email box. Please fill it out.');
            setShowAlert(true); // Show alert for missing Email
            return;
        } else if (!password) {
            setAlertMessage('Oops! You missed the Password box. Please fill it out.');
            setShowAlert(true); // Show alert for missing Password
            return;
        }

        // If all fields are filled, show confirmation message
        setAlertMessage('Do you want to submit your details?');
        setIsConfirmation(true); // Set to confirmation mode
        setShowAlert(true); // Show the confirmation box
    };

    // Handle confirmed submission
    const confirmSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            console.log(response.data);
            // Handle success (e.g., redirect or show success message)
        } catch (error) {
            console.error(error);
            setAlertMessage('An error occurred during registration. Please try again.');
            setIsConfirmation(false); // Return to alert mode for error
            setShowAlert(true); // Show error alert
        }
        setShowAlert(false); // Hide the confirmation box after submission
    };

    return (
        <div className='flex flex-col h-full justify-center items-center'>
            {/* Alert Box Component, conditionally rendered */}
            {showAlert && 
                <AlertBox 
                    message={alertMessage}
                    type={isConfirmation ? "confirm" : "alert"} // Show confirm buttons for confirmation, OK button for alerts
                    onCancel={() => setShowAlert(false)} // Close alert on Cancel
                    onConfirm={isConfirmation ? confirmSubmit : () => setShowAlert(false)} // If confirmation, submit; else close
                />
            }
            <form onSubmit={handleSubmit} className="w-auto px-10 bg-[#ffffff30] backdrop-blur-2xl py-20 rounded-2xl space-y-4 flex flex-col justify-center items-center">
                <h1 className='text-5xl font-justsans  -translate-y-8'>Register</h1>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 w-full rounded-xl border-0 focus:outline-none pl-4"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 w-full rounded-xl border-0 focus:outline-none pl-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 w-full rounded-xl border-0 focus:outline-none pl-4"
                />
                <div className='flex justify-between space-x-4 w-full -translate-y-2'>
                    <a onClick={toggleRegister} className='hover:underline transition-all text-sm'>Already have an Account?</a>
                    <a className='hover:underline transition-all text-sm'>Forget Password?</a>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 px-20 rounded-full">Register</button>
                <div className='flex space-x-1 translate-y-6'>
                    <div className='bg-white w-3 h-3 rounded-full'></div>
                    <div className='bg-white w-3 h-3 rounded-full'></div>
                </div>
            </form>
        </div>
    );
};

export default Register;
