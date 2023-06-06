import React, { useState } from "react";
import FormRowSelect from "../component/FormRowSelect";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  reason: "business",
  type: "internal",
  division: "filters",
  category: "quality A",
  priority: "high",
  department: "strategy",
  start: "",
  end: "",
  location: "",
  status: "registered",
};
const CreateProject = () => {
  const [value, setValue] = useState(initialState);

  const reasonOptions = ["business", "dealership", "transport"];
  const projectTypeOptions = ["internal", "external", "vendor"];
  const divisionOptions = [
    "filters",
    "compressor",
    "pumps",
    "glass",
    "water heater",
  ];
  const categoryOptions = ["quality A", "quality B", "quality C", "quality D"];
  const priorityOptions = ["low", "medium", "high"];
  const departmentOptions = [
    "strategy",
    "finance",
    "quality",
    "maintenance",
    "stores",
    "finance",
    "stores",
  ];

  const handleProjectInput = (e) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const navigate = useNavigate();
  const token = useSelector((store) => store.authReducer.token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const res = await axios.post("http://localhost:8080/project/add", value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
      setValue(initialState);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            type="text"
            value={value.name}
            onChange={handleProjectInput}
            required={true}
          />
        </div>
        <FormRowSelect
          labelText="reason"
          name="reason"
          type="text"
          value={value.reason}
          handleChange={handleProjectInput}
          list={reasonOptions}
        />
        <FormRowSelect
          labelText="type"
          name="type"
          type="text"
          value={value.type}
          handleChange={handleProjectInput}
          list={projectTypeOptions}
        />
        <FormRowSelect
          labelText="division"
          name="division"
          type="text"
          value={value.division}
          handleChange={handleProjectInput}
          list={divisionOptions}
        />
        <FormRowSelect
          labelText="category"
          name="category"
          type="text"
          value={value.category}
          handleChange={handleProjectInput}
          list={categoryOptions}
        />
        <FormRowSelect
          labelText="priority"
          name="priority"
          type="text"
          value={value.priority}
          handleChange={handleProjectInput}
          list={priorityOptions}
        />
        <FormRowSelect
          labelText="department"
          name="department"
          type="text"
          value={value.department}
          handleChange={handleProjectInput}
          list={departmentOptions}
        />
        <div>
          <label htmlFor="location">location</label>
          <input
            type="text"
            name="location"
            value={value.location}
            onChange={handleProjectInput}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="start">Start Date as per Project Plan</label>
          <input
            type="date"
            name="start"
            value={value.start}
            onChange={handleProjectInput}
            min={new Date().toISOString().split("T")[0]}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="end">End Date as per Project Plan</label>
          <input
            type="date"
            name="end"
            value={value.end}
            onChange={handleProjectInput}
            min={value.start}
            required={true}
          />
        </div>
        <button type="submit">Save Project</button>
      </form>
      <p>
        Status: <span style={{ fontWeight: "bolder" }}>{value.status}</span>
      </p>
    </div>
  );
};

export default CreateProject;
