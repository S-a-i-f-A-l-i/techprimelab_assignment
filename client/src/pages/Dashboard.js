import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getStatusAction } from "../redux/actions/projectAction";
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
    <div>
      <div>
        <p>Total Projects</p>
        <h3>
          {values.registered +
            values.running +
            values.cancelled +
            values.closed}
        </h3>
      </div>
      <div>
        <p>Closed</p>
        <h3>{values.closed}</h3>
      </div>
      <div>
        <p>Running</p>
        <h3>{values.running}</h3>
      </div>
      {/* <div><p>Closure Delay</p><h3>{}</h3></div> */}
      <div>
        <p>Cancelled</p>
        <h3>{values.cancelled}</h3>
      </div>
    </div>
  );
};

export default Dashboard;
