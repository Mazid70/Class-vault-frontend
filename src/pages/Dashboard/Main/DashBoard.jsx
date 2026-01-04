import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './SideBar';

const DashBoard = () => {
  return (
    <main className=" bg-[#0808086f] flex">
      <section>
        <Sidebar />
      </section>
      <section className="flex-1 relative">
        <div className="pointer-events-none z-0 absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-b from-pink-500/10 to-purple-500/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto space-y-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashBoard;