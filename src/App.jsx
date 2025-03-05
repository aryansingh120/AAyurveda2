import { useState } from 'react'
import Navbar from './Components/Navbar'
import "./index.css";
import Scroll from './Components/Scroll';
import ScrollText from './Components/ScrollText';
import VideoPlayer from './Components/VideoPlayer';
import Products from './Components/Products';
import { Route, Routes } from 'react-router-dom';
import AllProducts from './Components/AllProducts';
import ProductDetails from './Components/ProductDetails';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import VerifyOtp from './Components/VerifyOtp';
import ForgotPassword from './Components/ForgotPassword';
import VerifyOtp2 from './Components/VerifyOtp2';
import UpdatePassword from './Components/UpdatePassword';
import SuccessFull from './Components/Successfull';
import LoginSuccess from './Components/LoginSuccess';
import CartDetails from './Components/CartDetails';
import OrderAddress from './Components/OrderAddress';
import PaymentOptions from './Components/PaymentOptions';

function App() {

  return (
    <>
   
           <Routes>
         <Route path='/' element={<>
          <Navbar/> 
          <Scroll/> 
          <ScrollText/>
          <VideoPlayer/>
          <Products  category="Skincare" head="Best-Selling Skincare Products"/> 
          <Products  category="nutraceuticals" head="Power Up with Nutrition"/> 
          <Products  category="Hair Oil" head="Top Rated Hair-Oils"/> 


           <Footer/>
            </>}/> 

          <Route path='/ProductDetails' element={<ProductDetails/>}/>
          <Route path='/viewAllSkincareProducts' element={<AllProducts/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/verifyOtp' element={<VerifyOtp/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/verifyOtp2' element={<VerifyOtp2/>}/>
          <Route path='/updatePassword' element={<UpdatePassword/>}/>
          <Route path='/successfull' element={<SuccessFull  head="Otp verification Success" subHead="Registration complete. Log in and get started"/>}/>
          <Route path='/loginSuccess' element={<LoginSuccess/>}/>
          <Route path='/cartDetails' element={<CartDetails/>}/>
          <Route path='/orderAddress' element={<OrderAddress/>}/>
          <Route path='/paymentOptions' element={<PaymentOptions/>}/>











        </Routes>    
       

       


       


        
    </>
  )
}

export default App
