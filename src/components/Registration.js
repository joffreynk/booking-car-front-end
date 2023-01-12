import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/auth/SignUp';
import fetchedImgSrc from '../images/cover-image.jpg';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUser_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      name,
      user_name: username,
      password,
      role: '',
      email,
      profile_picture: 'profile not exist',
    };
    dispatch(signUpUser(userInfo));
    navigate('/vehicles');
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative z-10 flex flex-wrap -m-8">
        <div className="w-full md:w-1/2 hidden md:block p-8 bg-no-repeat " style={{ backgroundImage: `url(${fetchedImgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="w-full md:w-1/2 p-8">
          <div className="p-4 py-16 flex flex-col justify-center bg-blueGray-100 h-full">
            <form onSubmit={(e) => handleSubmit(e)} className="md:max-w-lg mx-auto">
              <label htmlFor="signInInput1-1" className="block mb-4">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">Name *</p>
                <input required onChange={(e) => setName(e.target.value)} value={name} className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signInInput1-1" type="text" placeholder="Enter Name" />
              </label>
              <label htmlFor="signInInput1-2" className="block mb-4">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">Username *</p>
                <input required onChange={(e) => setUser_name(e.target.value)} value={username} className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signInInput1-2" type="text" placeholder="Enter Username" />
              </label>
              <label htmlFor="signInInput1-3" className="block mb-4">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">Email Address *</p>
                <input required onChange={(e) => setEmail(e.target.value)} value={email} className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signInInput1-3" type="text" name="email" placeholder="Enter email address" />
              </label>
              <label htmlFor="signInInput1-4" className="block mb-4">
                <p className="mb-2 text-gray-900 font-semibold leading-normal">Password *</p>
                <input required onChange={(e) => setPassword(e.target.value)} value={password} className="px-4 py-3.5 w-full text-gray-400 font-medium placeholder-gray-400 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300" id="signInInput1-4" type="password" placeholder="Enter Password" />
              </label>
              <div className="flex flex-wrap justify-between -m-2 mb-4">
                <div className="w-auto p-2" />
                <div className="w-auto p-2"><Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">Sign In</Link></div>
              </div>
              <button className="mb-9 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200" type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
