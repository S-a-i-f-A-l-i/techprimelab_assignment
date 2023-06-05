import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <main>
        <nav>
          <NavLink to="/">Dashboard</NavLink> &nbsp;
          <NavLink to="/projects">Projects</NavLink> &nbsp;
          <NavLink to="/create-project">Add Project</NavLink> &nbsp;
        </nav>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
