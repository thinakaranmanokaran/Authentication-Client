import React, { useState, useEffect } from 'react';

const AlertBox = ({ message, type, onCancel, onConfirm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Show the AlertBox with zoom-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle the exit animation
  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onConfirm) {
        onConfirm(); // Trigger the confirm action after animation
      }
    }, 300); // Duration of the zoom-out animation
  };

  return (
    <div className={`absolute z-50 top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#00000060] backdrop-blur-sm`}>
      <div
        className={`p-6 bg-white rounded-xl shadow-lg transition-transform min-w-60 duration-300 ease-in-out ${
          isVisible && !isExiting ? 'scale-100' : 'scale-0'
        } ${isExiting ? 'scale-0' : 'scale-100'}`}
      >
        <div className='font-bold text-center'>{message}</div>

        {/* Conditionally render OK button or Cancel/Confirm buttons based on the type */}
        <div className='flex justify-evenly mt-4'>
          {type === 'alert' ? (
            <button
              className='bg-blue-500 text-white hover:scale-110 transition-all shadow-md px-3 py-2 rounded-md text-xs'
              onClick={handleExit}
            >
              OK
            </button>
          ) : (
            <>
              <button
                className='bg-black text-white hover:scale-110 transition-all shadow-md px-3 py-2 rounded-md text-xs'
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className='bg-red-500 text-white hover:scale-110 transition-all shadow-md px-3 py-2 rounded-md text-xs'
                onClick={handleExit}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
