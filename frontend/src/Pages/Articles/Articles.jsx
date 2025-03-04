import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Articles = ({ successUpdateMessage }) => {

    // define the articles
    const [articles, setArticles] = useState([]);

    // set the error message
    const [errorMessage, setErrorMessage] = useState("");

    // set the success message when the delete action is successfully
    const [successDeleteMsg, setSuccessDeleteMsg] = useState("");

    // get the token from the localStorage
    const token = localStorage.getItem("authToken");

    // set a state message when no articles are found from database
    const [noContentMessage, SetNoContentMessage] = useState("");


    // a boolean to change the state of the message to display after some seconds
    const [isVisible, setIsVisible] = useState(true);


    // fetch all articles in databases
    const fetchAllArticles = async () => {

        //error handling in get request of articles
        try {

            const response = await axios.get(
                "http://localhost:3000/articles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
                setArticles(response.data);
            }

        } catch (error) {

            console.error("Error", error);

            if (error.status === 400) {
                SetNoContentMessage("Aucun article en base de donnees, Veuillez en ajouter !");
                setArticles([]);
            } else {
                setErrorMessage("Un erreur est survenu, veuillez reessayez encore !")
            }
        }
    }

    /// hook hide the message after 8seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 8000);

        // Cleanup the timer when the component unmounts or before setting a new one
        return () => clearTimeout(timer);
    }, []);


    // hook loading the articles in the mounting of component
    useEffect(() => {
        fetchAllArticles();
    }, []);


    // a function to delete the article with id_article
    const handleDelete = (id) => {

        const confirm = window.confirm("Voulez vous vraiment effectuer cette action ?");

        if (confirm) {

            axios.delete(`http://localhost:3000/articles/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then(res => {
                    location.reload(),
                        setSuccessDeleteMsg("Article deleted successfully")
                })
                .catch(err => console.error(err))
        }
    }



    return (
        <div className='mt-6 px-10 space-y-5'>
            {
                (isVisible && successDeleteMsg) && <div className='bg-green-500 w-auto h-11 rounded-lg py-2 relative mb-10'>
                    <p className='text-center text-black'>{successDeleteMsg}</p>
                </div>
            }
            {
                (isVisible && successUpdateMessage) && <div className='bg-green-500 w-auto h-11 rounded-lg py-2 relative mb-10'>
                    <p className='text-center text-black'>{successUpdateMessage}</p>
                </div>
            }
            {
                noContentMessage !== "" ? (
                    <div className="mt-6 px-10 space-y-5">
                        <h1 className='text-3xl'>Toutes les articles</h1>
                        <div className='flex justify-end items-center '>
                            <Link to="/articles/new" className='bg-blue-500 rounded-lg px-6 py-2 text-lg'>Ajouter un article</Link>
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Identifiant
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nom
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantité
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        articles.length > 0 ? articles.map((article, index) => (
                                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                                <th scope="row" className="px-6 text-lg py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {article.id_article}
                                                </th>
                                                <td className="px-6 py-4 text-lg">
                                                    {article.name}
                                                </td>
                                                <td className="px-6 py-4 text-lg">
                                                    {article.quantity}
                                                </td>
                                                <td className="px-6 py-4 flex justify-center items-center">
                                                    <div className='flex gap-9'>
                                                        <Link to={`/articles/edit/${article.id_article}`} className="font-medium text-2xl px-3 py-2 text-black bg-yellow-500 rounded-lg hover:underline">
                                                            <MdEdit />
                                                        </Link>
                                                        <button onClick={e => handleDelete(article.id_article)} className="font-medium text-2xl px-3 py-2 text-black bg-red-500 rounded-lg hover:underline">
                                                            <MdDelete />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                                <td className='text-center'>Aucun Article dans la base, Veuillez en ajouter !</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center'>
                        <div>
                            <h1 className='text-3xl'>Toutes les articles</h1>

                            <Link to="/articles/new" className='bg-blue-500 rounded-lg px-6 py-2 text-lg'>Ajouter un article</Link>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Articles