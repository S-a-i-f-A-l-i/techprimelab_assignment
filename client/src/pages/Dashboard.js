import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getStatusAction } from "../redux/actions/projectAction";
import styles from "../assets/styles/Dashboard.module.css";
const Dashboard = () => {
  const token = useSelector((store) => store.authReducer.token);
  const [values, setValues] = useState({
    registered: 0,
    running: 0,
    cancelled: 0,
    closed: 0,
  });
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://techprimelab-assignment-lmk9.onrender.com/project/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      getStatusAction(res.data.defaultStatus, dispatch);
      setValues(res.data.defaultStatus);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.Wrapper}>
      <div>
        <div>
          <span>Total Projects</span>
          <h3>
            {values.registered +
              values.running +
              values.cancelled +
              values.closed}
          </h3>
        </div>
        <div>
          <span>Closed</span>
          <h3>{values.closed}</h3>
        </div>
        <div>
          <span>Closed</span>
          <h3>{values.closed}</h3>
        </div>
        <div>
          <span>Running</span>
          <h3>{values.running}</h3>
        </div>
        {/* <div><p>Closure Delay</p><h3>{}</h3></div> */}
        <div>
          <span>Cancelled</span>
          <h3>{values.cancelled}</h3>
        </div>
      </div>
      <div>
        <h2>Department wise Total Vs Closed</h2>
      </div>
      <div>Chart here</div>
    </div>
  );
};

export default Dashboard;
