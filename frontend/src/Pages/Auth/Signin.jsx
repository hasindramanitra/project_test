import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import DelayedMessage from '../../components/DelayedMessage';



const Signin = ({ successMessage }) => {

  const [inputType, setInputType] = useState('password');

  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [errorEmailMsg, setErrorEmailMsg] = useState("");

  const [errorPasswordMsg, setErrorPasswordMsg] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the paragraph after 3 seconds
    }, 8000);

    // Cleanup the timer when the component unmounts or before setting a new one
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/signin", { email: email, password: password });

      if (response.status === 201) {
        console.log("Login successfully");
        const token = response.data.access_token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("keepLoggedIn", JSON.stringify(true));
        navigate('/articles');
      }
    } catch (error) {

      if (error.status === 400) {

        if (email !== "" && password === "") {
          setErrorEmailMsg("");
          setErrorPasswordMsg("Password should not be empty");
          setErrorMessage("");
        } else if (email === "" && password !== "") {
          setErrorEmailMsg("Email should not be empty or must be an email");
          setErrorPasswordMsg("");
          setErrorMessage("");
        } else {
          setErrorEmailMsg("Email should not be empty or must be an email");
          setErrorPasswordMsg("Password should not be empty");
          setErrorMessage("");
        }

      } else if (error.status === 403) {
        setErrorEmailMsg("");
        setErrorPasswordMsg("");
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error has occured, Please try again");
      }

    }
  }

  const handleChangeInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  return (
    <div className='flex justify-center items-center h-screen'>

      <div className='mt-[-5rem]'>
        {
          (isVisible && successMessage) &&  <div className='bg-green-500 w-auto h-11 rounded-lg py-2 relative mb-10'>
            <p className='text-center text-black'>{successMessage}</p>
          </div>
        }
        <form onSubmit={handleSubmit} className='w-[27rem] space-y-7 border rounded-lg p-5 h-auto shadow-md shadow-gray-400'>
          {
            errorMessage !== "" && <div className='bg-red-500 w-auto h-11 rounded-lg py-2 relative'>
              <p className='text-center text-white'>{errorMessage}</p>
              <button onClick={e => setErrorMessage("")} className='bg-white rounded-xl text-lg duration-200 ease-in-out absolute right-3 top-2 cursor-pointer px-2'>x</button>
            </div>
          }
          <h1 className='text-5xl text-center'>Connexion</h1>
          <div className='flex flex-col'>
            <label htmlFor="email">Email <span className='text-red-800'>*</span></label>
            <input type="email" name='email' onChange={e => setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className='border h-10 rounded-md px-2 outline-none' />
            {
              errorEmailMsg !== "" && <span className='text-red-500'>{errorEmailMsg}</span>
            }
          </div>
          <div className='flex flex-col relative'>
            <label htmlFor="password">Password <span className='text-red-800'>*</span></label>
            <input type={inputType} name="password" onChange={e => setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className='border h-10 rounded-md px-2 outline-none' />
            <p onClick={handleChangeInputType} className='absolute top-9 right-3 cursor-pointer text-lg text-gray-600'>
              {
                inputType === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
              }
            </p>
            {
              errorPasswordMsg !== "" && <span className='text-red-500'>{errorPasswordMsg}</span>
            }
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <input type="checkbox" name="remember" id="" /><label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className='text-red-600'>Mot de passe oublié ?</a>
          </div>
          <button className="border rounded-md bg-[#3664F4] hover:shadow-lg hover:shadow-blue-100 duration-150 w-full py-2 text-white mt-2">Se connecter</button>
          <div className='flex justify-between px-14'>
            <p>Pas encore inscrit ?</p>
            <a className='text-[#3664F4] hover:underline' href="/inscription">Créer un compte</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin