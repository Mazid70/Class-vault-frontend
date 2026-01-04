import {  useEffect, useState } from 'react';
import { BiSolidUserAccount } from 'react-icons/bi';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import useCallData from '../../customHooks/useCallData';
import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { MdError } from 'react-icons/md';
import bg from '../../assets/bg.jpg';
// Css
const labelCss = `relative w-[250px] rounded-md p-[1.5px] bg-gray-700 transition-all duration-300 focus-within:bg-gradient-to-r focus-within:from-pink-400 focus-within:to-blue-500 focus-within:shadow-[0_0_18px_rgba(236,72,153,0.5)]`;

const inputCss = `absolute left-3 top-4 text-white/70 transition-all duration-300 pointer-events-none peer-focus:top-1 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm`;
const SignIn = () => {
  const [isShow, setShow] = useState(false);
  const [isError,setError]=useState('')
  const handlePass = () => {
    setShow(!isShow);
  };
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  },[user])
  console.log(user)
  const axiosData = useCallData();
  const handleRegister = async e => {
    e.preventDefault();
    const form = e.target;
    const studentId = form.id.value;
    const password = form.password.value;
    const userData = {
      studentId,
      password,
    };
    console.log(userData);
    try {
      const res = await axiosData.post('/users/signin', userData);
      window.location.reload()
   
    
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  };
  return (
    <main className="min-h-screen flex  bg-[#0C1019]">
      {/* LEFT SIDE */}
      <div className="flex-1 flex justify-center items-center container mx-auto">
        <div className="max-w-md w-full">
          <h1 className="font-bold text-sm text-white/60">
            It's Your Platfrom
          </h1>
          <h2 className="font-extrabold text-4xl text-white mt-2">
            Welcome Back
          </h2>

          <p className="mt-2 text-white/60">
            Don't have an Account?{' '}
            <Link
              to="/register"
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleRegister}>
            {/* Email */}
            <div className={`w-full ${labelCss}`}>
              <input
                type="text"
                name="id"
                placeholder=""
                className="peer w-full h-13 rounded-md bg-gray-700 pl-3 pt-5 text-white outline-none pb-2 "
              />

              <label className={inputCss}>Your ID</label>

              <BiSolidUserAccount className="absolute right-3 top-4 text-white/70 text-xl" />
            </div>

            {/* Password */}
            <div className={`w-full ${labelCss}`}>
              <input
                type={isShow ? 'text' : 'password'}
                name="password"
                placeholder=""
                className="peer w-full h-13 rounded-md bg-gray-700 pl-3 pt-5 text-white outline-none pb-2 "
              />

              <label className={inputCss}>Password</label>

              {isShow ? (
                <BsFillEyeSlashFill
                  onClick={handlePass}
                  className="cursor-pointer absolute right-3 top-4 text-white/70 text-xl"
                />
              ) : (
                <BsFillEyeFill
                  onClick={handlePass}
                  className="cursor-pointer absolute right-3 top-4 text-white/70 text-xl"
                />
              )}
            </div>
            <Link to="/signin/forgot-password">
              {' '}
              <h1 className="text-blue-400 -mt-3 text-right hover:underline">
                Forget Password?
              </h1>
            </Link>
            {isError && (
              <h1 className="text-red-400 -mt-6 -mb-[1px] pl-2 flex items-center gap-2">
                <MdError />
                {isError}
              </h1>
            )}
            {/* Button */}
            <input
              type="submit"
              value="Sign In"
              className=" cursor-pointer
                    w-full mt-4 py-3 rounded-md font-semibold text-white
                    bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 
                    hover:opacity-90 transition-all
                  "
            />
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className="flex-1 relative bg-[url('./bg.jpg')] bg-cover "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-gray-900/60" />
      </div>
    </main>
  );
};

export default SignIn;
