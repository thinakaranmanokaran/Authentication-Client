import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

import BackGround from './assets/images/pppsychedelic.png'
import AlertBox from './components/AlertBox';


const App = () => {

    const [showRegister, setShowRegister ] = useState(false);

    function toggleRegister() {
        setShowRegister(!showRegister);
    }

    return (
        <div className="bg-[url('./assets/images/svg.png')] bg-sky-300 bg-no-repeat bg-cover h-screen w-screen  m-0 p-4">
            <div className='flex justify-center h-full space-x-4 ' >
                {showRegister ? ( <Login  toggleRegister={toggleRegister}/> ) : ( <Register toggleRegister={toggleRegister} /> ) }
            </div>
            {/* <AlertBox /> */}
        </div>
    );
};

export default App;
