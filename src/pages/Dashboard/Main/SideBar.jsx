import React, { useContext, useState } from 'react';
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaBell,
  FaSignOutAlt,
} from 'react-icons/fa';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
const {handleLogout}=useContext(AuthContext)
  const menuItems = [
    { title: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { title: 'Users', icon: <FaUsers />, path: '/dashboard/users' },
    { title: 'Notes', icon: <FaFileAlt />, path: '/dashboard/pending-notes' },
    {
      title: 'My Notes',
      icon: <FaFileAlt />,
      path: '/dashboard/mynotes',
    },
    
  ];

  return (
    <div
      className={`flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      } bg-[#1a1a1a]/50 backdrop-blur-xl border-r border-white/10 h-screen transition-all duration-300 relative`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <span
          className={`text-white font-extrabold text-xl tracking-wide ${
            !isOpen && 'hidden'
          }`}
        >
          MyDashboard
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white  hover:text-indigo-400 transition text-2xl cursor-pointer"
        >
          {isOpen ? (
            <IoIosArrowDropleftCircle />
          ) : (
            <IoIosArrowDroprightCircle />
          )}
        </button>
      </div>

      {/* Menu */}
      <ul className="flex flex-col mt-4 gap-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={index} className="relative">
              <Link
                to={item.path}
                className={`flex items-center gap-4 p-3 mx-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 shadow-lg text-white'
                    : 'text-white hover:bg-white/10 hover:backdrop-blur-md'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span className="font-medium">{item.title}</span>}

                {/* Notification Badge */}
                {item.badge && isOpen && (
                  <span className="ml-auto bg-green-500 text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>

              {/* Active gradient indicator */}
              {isActive && (
                <span
                  className={`absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-indigo-400 to-purple-500`}
                />
              )}
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      {isOpen ? 
        <button onClick={handleLogout} className='flex items-center font-semibold gap-2 cursor-pointer absolute bottom-10 left-5'>
          <FaSignOutAlt />logout
        </button>:<button onClick={handleLogout} className=' text-2xl font-semibold gap-2 cursor-pointer absolute bottom-10 left-6'>
          <FaSignOutAlt />
       </button>
      }
    </div>
  );
};

export default Sidebar;
