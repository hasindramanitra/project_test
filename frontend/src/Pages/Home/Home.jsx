import React from 'react'
import Navbar from '../../components/Navbar';
import { IoStar } from 'react-icons/io5';


const userPhotos = [
    { id: 1, name: "John Doe", photoUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 2, name: "Jane Smith", photoUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: 3, name: "Michael Brown", photoUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    { id: 4, name: "Emily Johnson", photoUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
    { id: 5, name: "David Lee", photoUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
];

const Home = () => {
  return (
    <div>
        <div className='flex justify-center mt-32'>
                <h1 className='border border-red-600 rounded-full py-1 px-3 cursor-pointer text-base'>Si tu galères à faire tes achats par<span className='text-red-600'>"manque d'info"</span></h1>
            </div>
            <div className='flex justify-center mt-5'>
                <div>
                    <h1 className='text-7xl font-bold pl-12'>Assure tes achats</h1>
                    <h1 className='text-7xl font-bold'>en nous rejoignant</h1>
                </div>
            </div>
            <div className='flex justify-center mt-6'>
                <div>
                    <p className='text-lg'>La solution qui vous donne toutes les connaissances nécessaires</p>
                    <p className='text-lg pl-12'>pour trouver et réussir l'achat de vos produits en ligne</p>
                </div>
            </div>
            <div className='flex justify-center mt-6'>
                <div className='flex -space-x-2 overflow-hidden'>
                    {
                        userPhotos.map((user, index) => (
                            <img key={index} src={user.photoUrl} alt="" className='rounded-full w-12 h-12' />
                        ))
                    }
                </div>
                <div>
                    <div className='flex gap-1 text-[#FFB300] text-lg'>
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                    </div>
                    <p className='mt-2'>utilisé par <span className='text-[#3664F4]'>+ 100M clients</span></p>
                </div>
            </div>
            <div className='flex justify-center mt-20'>
                <button className="btn">
                    <span>Rejoinez Nous</span>
                </button>
            </div>
    </div>
  )
}

export default Home