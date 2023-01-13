import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import fetchedImgSrc from '../images/login-image.jpg';
import { login } from '../redux/auth/login';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUser_name] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      user_name: username,
      password,
    };
    dispatch(login(userInfo));
    setUser_name('');
    setPassword('');
    navigate('/vehicles');
  };

  return (
    <section className="relative bg-white overflow-hidden h-screen">
      <div className="relative z-10 flex flex-wrap h-full">
        <div className="w-full h-full md:w-1/2 hidden md:block p-8 bg-no-repeat " style={{ backgroundImage: `url(${fetchedImgSrc})`, backgroundSize: 'cover' }} />
        <div className="w-full md:w-1/2 p-8">
          <div className="p-4 py-16 flex flex-col justify-center bg-blueGray-100 h-full">
            <form className="md:max-w-lg mx-auto">
              <label htmlFor="signInInput-1" className="block mb-4">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">Username *</p>
                <input required className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" onChange={(e) => setUser_name(e.target.value)} value={username} id="signInInput1-1" type="text" placeholder="Enter username" />
              </label>
              <label htmlFor="signInInput1-" className="block mb-5">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">Password *</p>
                <input required className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" onChange={(e) => setPassword(e.target.value)} value={password} id="signInInput1-2" type="password" placeholder="********" />
              </label>
              <div className="flex flex-wrap justify-between -m-2 mb-4">
                <div className="w-auto p-2" />
                <div className="w-auto p-2"><Link to="/registration" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Sign Up</Link></div>
              </div>
              <button
                className="mb-9 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
                type="button"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
