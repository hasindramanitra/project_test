import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateArticle = () => {

    const token = localStorage.getItem("authToken");

    const { id } = useParams();

    const navigate = useNavigate();

    const [values, setValues] = useState({
        id_article: null,
        name: '',
        quantity: null
    });

    const [idArticle, setIdArticle] = useState(null);

    const [name, setName] = useState("");

    const [quantity, setQuantity] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [errorIdentifiantArticle, setErrorIdentifiantArticle] = useState("");

    const [errorNameArticle, setErrorNameArticle] = useState("");

    const [errorQuantityArticle, setErrorQuantityArticle] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/articles/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                setValues(res.data)
            })
            .catch(err => console.error(err)
            )
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.put(`http://localhost:3000/articles/${id}`, {
                id_article: Number(values.id_article),
                name: values.name,
                quantity: Number(values.quantity)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {

                setSuccessMessage(response.data.message);
                setErrorMessage("");
                navigate("/articles");

            } else {

                setErrorMessage("An error has occured, please try again !");
            }

        } catch (error) {

            console.error(error);
            if (error.status === 400) {

                if (values.id_article === null && values.name === "" && values.quantity === null) {

                    setErrorIdentifiantArticle("Identifiant should not be null or negative");
                    setErrorNameArticle("Name should not be empty");
                    setErrorQuantityArticle("Quantity should not be null");

                } else if (values.id_article < 0 && values.name === "" && values.quantity === null) {

                    setErrorIdentifiantArticle("Identifiant should not be negative");
                    setErrorNameArticle("Name should not be empty");
                    setErrorQuantityArticle("Quantity should not be null");

                } else if ((values.id_article !== null && typeof values.id_article === "number") && values.name === "" && values.quantity === null) {

                    setErrorIdentifiantArticle("Identifiant should be a number");
                    setErrorNameArticle("Name should not be empty");
                    setErrorQuantityArticle("Quantity should not be null");

                } else if ((values.id_article !== null && values.id_article > 0 && typeof values.id_article === "number") && (values.name !== "" && values.name.length < 4) && values.quantity === null) {

                    setErrorIdentifiantArticle("");
                    setErrorNameArticle("Name should not least 4 characters");
                    setErrorQuantityArticle("Quantity should not be null");
                } else if ((values.id_article !== null && values.id_article > 0 && typeof values.id_article === "number") && (values.name !== "" && values.name.length > 4) && (values.quantity !== null && typeof values.quantity !== "number")) {

                    setErrorIdentifiantArticle("");
                    setErrorNameArticle("");
                    setErrorQuantityArticle("Quantity should be a number");
                } else if ((values.id_article !== null && values.id_article > 0 && typeof values.id_article === "number") && (values.name !== "" && values.name.length > 4) && (values.quantity !== null && typeof values.quantity === "number" && values.quantity < 0)) {

                    setErrorIdentifiantArticle("");
                    setErrorNameArticle("");
                    setErrorQuantityArticle("Quantity should be positive");
                }
            } else {
                setErrorMessage("An error has occured, please try again !");
            }

        }
    }

    console.log(errorIdentifiantArticle)

    return (
        <div>
            <div className='flex justify-center items-center mt-[-100px] h-screen'>
                <div>
                    <form onSubmit={handleSubmit} className='w-[27rem] space-y-7 border rounded-lg p-5 h-auto shadow-md shadow-gray-400'>
                        {
                            errorMessage !== "" && <div className='bg-red-500 w-auto h-11 rounded-lg py-2 relative'>
                                <p className='text-center text-white'>{errorMessage}</p>
                                <button onClick={e => setErrorMessage("")} className='bg-white rounded-xl text-lg duration-200 ease-in-out absolute right-3 top-2 cursor-pointer px-2'>x</button>
                            </div>
                        }
                        <h1 className='text-5xl text-center'>Modification de l'article {values.id_article}</h1>
                        <div className='flex flex-col'>
                            <label htmlFor="id_article">Identification <span className='text-red-800'>*</span></label>
                            <input type="number" name="id_article" onChange={e => setValues({ ...values, id_article: e.target.value })} value={values.id_article} placeholder="Entrez l'identifiant de l'article" className='border h-10 rounded-md px-2 outline-none' />
                            {
                                errorIdentifiantArticle !== "" && <span className="text-red-500">{errorIdentifiantArticle}</span>
                            }
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="name">Nom<span className='text-red-800'>*</span></label>
                            <input type="text" name="name" onChange={e => setValues({ ...values, name: e.target.value })} value={values.name} placeholder="Entrez le nom de l'article" className='border h-10 rounded-md px-2 outline-none' />
                            {
                                errorNameArticle !== "" && <span className="text-red-500">{errorNameArticle}</span>
                            }
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor="quantity">Quantité <span className='text-red-800'>*</span></label>
                            <input type="number" name="quantity" onChange={e => setValues({ ...values, quantity: e.target.value })} value={values.quantity} placeholder='Entrez la quantité' className='border h-10 rounded-md px-2 outline-none' />
                            {
                                errorQuantityArticle !== "" && <span className="text-red-500">{errorQuantityArticle}</span>
                            }
                        </div>
                        <button className="border rounded-md bg-[#3664F4] hover:shadow-lg hover:shadow-blue-100 duration-150 w-full py-2 text-white mt-2">Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateArticle