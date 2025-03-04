import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Signin from './Pages/Auth/Signin.jsx'
import Signup from './Pages/Auth/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import Articles from './Pages/Articles/Articles.jsx'
import NewArticle from './Pages/Articles/NewArticle.jsx'
import UpdateArticle from './Pages/Articles/UpdateArticle.jsx'
import { useState } from 'react'
import ProtectedRoute from './components/ProtectedRoute.jsx'





function App() {

  const [successMessage, setSuccessMessage] = useState("");
  const [successUpdateMessage, setUpdateSuccessMessage] = useState("");

  const isLoggedIn = localStorage.getItem("authToken");

  console.log(successUpdateMessage);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/connexion' element={<Signin successMessage={successMessage} />} />
        <Route path='/inscription' element={<Signup setSuccessMessage={setSuccessMessage} />} />

        {/* protected route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles successUpdateMessage={successUpdateMessage}/>} />
          <Route path="/articles/new" element={<NewArticle />} />
          <Route path="/articles/edit/:id" element={<UpdateArticle setUpdateSuccessMessage={setUpdateSuccessMessage}/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
