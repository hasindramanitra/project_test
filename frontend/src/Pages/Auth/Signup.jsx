import axios from "axios";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



const Signup = ({setSuccessMessage}) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errorUsernameMsg, setErrorUsernameMsg] = useState("");

    const [errorEmailMsg, setErrorEmailMsg] = useState("");

    const [errorPasswordMsg, setErrorPasswordMsg] = useState("");

    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return hasUpperCase && hasNumber && hasSpecialChar;
    };



    const [inputType, setInputType] = useState('password');

    const handleChangeInputType = () => {
        setInputType(inputType === 'password' ? 'text' : 'password');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:3000/auth/signup", {
                username: username,
                email: email,
                password: password
            });

            if (response.status === 201) {
                setSuccessMessage(response.data.message);
                setErrorMessage("");
                navigate("/connexion");

            } else {
                setErrorMessage("An error has occured, please try again !");
            }
        } catch (error) {

            if (error.status === 403) {
                setErrorMessage(error.response.data.message);
            } else if (error.status === 400) {

                if (username === "" && email === "" && password === "") {
                    setErrorUsernameMsg("Username should not be empty");
                    setErrorEmailMsg("Email should not be empty")
                    setErrorPasswordMsg("Password should not be empty")
                } else if (username !== "" && email === "" && password === "") {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("Email should not be empty")
                    setErrorPasswordMsg("Password should not be empty")
                } else if (username !== "" && email === "" && password === "") {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("Email should not be empty")
                    setErrorPasswordMsg("Password should not be empty")
                } else if (username === "" && email !== "" && validateEmail(email) && password === "") {
                    setErrorUsernameMsg("Username should not be empty");
                    setErrorEmailMsg("");
                    setErrorPasswordMsg("Password should not be empty")
                } else if (username === "" && email !== "" && validateEmail(email) && password !== "") {
                    setErrorUsernameMsg("Username should not be empty");
                    setErrorEmailMsg("")
                    setErrorPasswordMsg("")
                } else if (username !== "" && email === "" && password !== "") {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("Email should not be empty")
                    setErrorPasswordMsg("")
                } else if(username === "" && email === "" && password !== "" && validatePassword(password)){
                    setErrorUsernameMsg("Username should not be empty");
                    setErrorEmailMsg("Email should not be empty");
                    setErrorPasswordMsg("");
                } else if (username !== "" && email !== "" && validateEmail(email) && password === "") {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("");
                    setErrorPasswordMsg("Password should not be empty")
                } else if (username !== "" && email !== "" && validateEmail(email) && password.length < 8) {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("");
                    setErrorPasswordMsg("Password should have 8 characters at least.")
                } else if (username !== "" && email !== "" && validateEmail(email) && !validatePassword(password)) {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("");
                    setErrorPasswordMsg("Password must contain at least one uppercase letter, one number, and one special character.")
                } else if (username !== "" && !validateEmail(email) && validatePassword(password)) {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("Email should be valid");
                    setErrorPasswordMsg("")
                } else if (username !== "" && validateEmail(email) && validatePassword(password)) {
                    setErrorUsernameMsg("");
                    setErrorEmailMsg("");
                    setErrorPasswordMsg("");
                }
            } else {
                setErrorMessage("An error has occured, please try again !");
            }

        }
    }

    return (
        <>
            <div className='flex justify-center items-center mt-[-100px] h-screen'>
                <div>
                    <form onSubmit={handleSubmit} className='w-[27rem] space-y-7 border rounded-lg p-5 h-auto shadow-md shadow-gray-400'>
                        {
                            errorMessage !== "" && <div className='bg-red-500 w-auto h-11 rounded-lg py-2 relative'>
                                <p className='text-center text-white'>{errorMessage}</p>
                                <button onClick={e => setErrorMessage("")} className='bg-white rounded-xl text-lg duration-200 ease-in-out absolute right-3 top-2 cursor-pointer px-2'>x</button>
                            </div>
                        }
                        <h1 className='text-5xl text-center'>Inscription</h1>
                        <div className='flex flex-col'>
                            <label htmlFor="username">Nom d'utilisateur <span className='text-red-800'>*</span></label>
                            <input type="text" name="username" onChange={e => setUsername(e.target.value)} placeholder="Entrez votre nom d'utilisateur" className='border h-10 rounded-md px-2 outline-none' />
                            {
                                errorUsernameMsg !== "" && <span className="text-red-500">{errorUsernameMsg}</span>
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email">Email <span className='text-red-800'>*</span></label>
                            <input type="email" name="email" onChange={e => setEmail(e.target.value)} placeholder='Entrez votre adresse mail' className='border h-10 rounded-md px-2 outline-none' />
                            {
                                errorEmailMsg !== "" && <span className="text-red-500">{errorEmailMsg}</span>
                            }
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor="email">Password <span className='text-red-800'>*</span></label>
                            <input type={inputType} name="password" onChange={e => setPassword(e.target.value)} placeholder='Entrez votre mot de passe' className='border h-10 rounded-md px-2 outline-none' />
                            <p onClick={handleChangeInputType} className='absolute top-9 right-3 cursor-pointer text-lg text-gray-600'>
                                {
                                    inputType === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                }
                            </p>
                            {
                                errorPasswordMsg !== "" && <span className="text-red-500">{errorPasswordMsg}</span>
                            }
                        </div>
                        <button className="border rounded-md bg-[#3664F4] hover:shadow-lg hover:shadow-blue-100 duration-150 w-full py-2 text-white mt-2">S'inscrire</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Signup;