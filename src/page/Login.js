import {React , useState}  from 'react'
import Checkbox from "../component/CheckBox";
import google from "../icons/google.png"
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie'
import '../App.css';
import img1 from "../pictures/1.jpg"
import img2 from "../pictures/2.jpg"
import img3 from "../pictures/3.jpg"
import img4 from "../pictures/4.jpg"
import img5 from "../pictures/5.jpg" 
import img6 from "../pictures/6.jpg" 
import img7 from "../pictures/7.jpg" 
 


function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleLogin = () => {
      // For simplicity, hardcoding the correct email and password.
      const correctEmail = 'diaakad19@gmail.com';
      const correctPassword = 'diaakadri';
  
      if (email === correctEmail && password === correctPassword) {
        // Redirect to the main page after successful login
        cookies.set('token','1', { expires: 7 });
        navigate('/Dashboard');
      } else {
        alert('Invalid email or password');
      }
    };

   return (
    <div className='flex h-screen w-full'>
       {/* LogIn Div */}
       <div className='w-[100%] bg-gray-100 items-center flex flex-col shadow-lg py-5 md:w-[60%]'>
           {/* Login Form  */}
           <div className='rounded-xl pt-20 p-10 m-8 w-[70%] h-[90%]  bg-white '>
              <h1 className='font-[500] text-4xl'>Welcome Back</h1>
              <h2 className='font-[400] text-gray-500 py-5'>Welcome back please enter your details</h2>
  
             {/* Inputs   */}
                <div>
                    {/* emila input */}
                     <div className='my-3 flex flex-col'>
                        <label for="name" className='font-[500]'>Email</label> 
                        <input onChange={(e) => setEmail(e.target.value)} className='my-2 border-[1px] p-2 border-gray-300 rounded ' type="text" placeholder='Enter Email' />
                     </div>
                    
                    {/* password input */}
                    <div className='my-3 flex flex-col'>
                        <label for="name" className='font-[500]'>password</label> 
                        <input onChange={(e) => setPassword(e.target.value)} className='my-2 border-[1px] p-2 border-gray-300 rounded ' type="text" placeholder='Enter password'/>
                     </div>

                </div>
               
                {/* Forget and remember password */}
                <div className='flex flex-col justify-between items-start my-4 md:items-center md:flex md:flex-row'>
                    <Checkbox label="Remember me" />
                    <a className='text-blue-500' href="http://">Forget password</a>
                </div>

                {/* Buttons Div */}
                <div className='flex flex-col items-center my-2'>
                    {/* login button */}
                    <button onClick={handleLogin} className='bg-blue-800 text-white w-full text-center p-2 rounded-xl my-2'>Login</button>
                    <button className='border-[1px] border-gray-300 text-black w-full text-center p-2 rounded-xl mt-2 flex items-center justify-center'>
                        <img className='w-5 mx-1' src={google} alt="" />
                        Sign in with google</button>
                </div>

           </div>
       </div>


       {/* deserts div */}
      <div className='w-[40%] flex items-center justify-center  bg-gray-100 pr-20'> 
         <div className='hidden md:flex box'>
            <span style={{ '--i': 1 }}><img src={img1}/></span>
            <span style={{ '--i': 2 }}><img src={img7} /></span>
            <span style={{ '--i': 3 }}><img src={img2} /></span>
            <span style={{ '--i': 4 }}><img src={img3} /></span>
            <span style={{ '--i': 5 }}><img src={img4} /></span>
            <span style={{ '--i': 6 }}><img src={img5} /></span>
            <span style={{ '--i': 7 }}><img src={img6} /></span>
         </div>
         </div>
    </div>
  )
}

export default Login
