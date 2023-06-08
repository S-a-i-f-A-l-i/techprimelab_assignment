import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import create from "../assets/images/create-project.svg";
import createActive from "../assets/images/create-project-active.svg";
import projects from "../assets/images/Project-list.svg";
import projectsActive from "../assets/images/Project-list-active.svg";
import dashboard from "../assets/images/Dashboard.svg";
import dashboardActive from "../assets/images/Dashboard-active.svg";
import styles from "../assets/styles/SharedLayout.module.css";
const SharedLayout = () => {
  const [dashActive, setDashActive] = useState(true);
  const [cActive, setCActive] = useState(false);
  const [pActive, setPActive] = useState(false);
  const handleClick = (num) => {
    if (num === 1) {
      setDashActive(() => true);
      setPActive(() => false);
      setCActive(() => false);
    } else if (num === 2) {
      setDashActive(() => false);
      setPActive(() => true);
      setCActive(() => false);
    } else if (num === 3) {
      setDashActive(() => false);
      setPActive(() => false);
      setCActive(() => true);
    }
  };
  return (
    <div>
      <main className={styles.main}>
        <nav>
          <NavLink to="/" onClick={() => handleClick(1)}>
            <img
              src={dashActive ? dashboardActive : dashboard}
              alt="dashboard"
            />
          </NavLink>
          &nbsp;
          <NavLink to="/projects" onClick={() => handleClick(2)}>
            <img src={pActive ? projectsActive : projects} alt="projects" />
          </NavLink>{" "}
          &nbsp;
          <NavLink to="/create-project" onClick={() => handleClick(3)}>
            <img src={cActive ? createActive : create} alt="create" />
          </NavLink>{" "}
          &nbsp;
        </nav>
        <div>
          <div>Nav here</div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharedLayout;
