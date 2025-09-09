import React,{ useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home_page from '../Components/home_page';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm';
import AdminRegisterForm from '../Components/AdminRegisterForm';
import ErrorPage from '../Components/ErrorPage';
import ProductListPage from '../Components/ProductListPage'; // import this
import ProductDetailPage from '../Components/ProductDetailPage';

const App = () => {
  const [superuser,setSuperuser] = useState(localStorage.getItem('superuser') === "true");
  const [userId,setUserId] = useState(localStorage.getItem('userId'));
  const [access, setAccess] = useState(localStorage.getItem('access')); 

  const handleLogin = (refreshToken, accessToken, userId, isSuperuser) => {
    localStorage.setItem('refresh', refreshToken);
    localStorage.setItem('access', accessToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('superuser', isSuperuser);

    setAccess(accessToken);
    setSuperuser(isSuperuser === "true");
  }

  const handleLogout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('userId');
    localStorage.removeItem('superuser');

    setAccess(null);
    setSuperuser(false);
  }

  return (
    <Routes>
      <Route path='/' element={<Home_page access={access} superuser={superuser} onLogout={handleLogout} />} />
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/adminregister' element={superuser ? <AdminRegisterForm /> : <ErrorPage /> } />
      <Route path='/login' element={<LoginForm onLogin={handleLogin}/>}/>
      <Route path="/:category" element={<ProductListPage access={access} superuser={superuser} onLogout={handleLogout}/>} />
      <Route path="/:category/:product_name/" element={<ProductDetailPage access={access} superuser={superuser} onLogout={handleLogout}/>} />
    </Routes>
  )
}

export default App;
