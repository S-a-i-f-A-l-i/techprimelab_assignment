import React from "react";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <main>
        <nav>Navbar</nav>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
