import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const Articles = () => {

    const [articles, setArticles] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");

    const token = localStorage.getItem("authToken");

    const fetchAllArticles = async () => {

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
        }
    }

    useEffect(() => {
        fetchAllArticles();
    }, []);


    const handleDelete = (id) => {

        const confirm = window.confirm("Voulez vous vraiment effectuer cette action ?");

        if(confirm) {

            axios.delete(`http://localhost:3000/articles/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then(res => { 
                    console.log(res),
                    location.reload()
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div className='mt-6 px-10 space-y-5'>
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
                            articles.map((article, index) => (
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
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Articles