import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAction } from "../redux/actions/projectAction";
import PaginationButton from "../component/PaginationButton";

const ProjectListing = () => {
  const timerId = useRef();
  const [projects, setProjects] = useState({
    projects: [],
    numOfPages: 0,
    totalProjects: 0,
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const token = useSelector((store) => store.authReducer.token);
  const dispatch = useDispatch();
  const pages = Array.from({ length: projects.numOfPages }, (_, index) => {
    return index + 1;
  });
  const getProjects = async () => {
    try {
      const res = await axios.get(
        `https://techprimelab-assignment-lmk9.onrender.com/project/all?search=${search}&page=${currentPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      if (JSON.stringify(projects) !== JSON.stringify(res.data))
        setProjects(res.data);
      if (res.data.numOfPages !== currentPage) {
        setCurrentPage(1);
      }
      getProjectAction(res.data, dispatch);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = async (id, value) => {
    try {
      const res = await axios.patch(
        `https://techprimelab-assignment-lmk9.onrender.com/project/all/${id}`,
        { status: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      getProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const debounce = () => {
    return (e) => {
      setSearch(() => e.target.value);
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        getProjects();
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);
  useEffect(() => {
    getProjects();
  }, [projects, currentPage]);
  return (
    <div>
      <div>
        <input
          type="text"
          name="search"
          value={search}
          onChange={optimizedDebounce}
        />
        <br />
      </div>
      {projects && (
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Reason</th>
              <th>Type</th>
              <th>Division</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.projects.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.reason}</td>
                  <td>{item.type}</td>
                  <td>{item.division}</td>
                  <td>{item.category}</td>
                  <td>{item.priority}</td>
                  <td>{item.department}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => handleClick(item._id, "running")}>
                      Start
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleClick(item._id, "closed")}>
                      Close
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleClick(item._id, "canceled")}>
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((item, index) => {
        return (
          <PaginationButton
            key={index}
            page={item}
            handlePage={setCurrentPage}
            // currentPage={currentPage}
          />
        );
      })}
      <button
        disabled={currentPage >= projects.numOfPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Prev
      </button>
    </div>
  );
};

export default ProjectListing;
