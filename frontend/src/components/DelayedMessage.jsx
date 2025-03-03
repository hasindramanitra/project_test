import { useState, useEffect } from "react";

const DelayedMessage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
        const timeoutId = setTimeout(() => {
            setMessage("User created Successfully, Please Sign in.");
        }, 3000);

        // Cleanup function to clear the timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div>
            {
                message !== "" && <div className='bg-green-500 w-auto h-11 rounded-lg py-2 relative mb-10'>
                    <p className='text-center text-black'>{message}</p>
                </div>
            }
        </div>
    );
};

export default DelayedMessage;