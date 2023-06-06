import Project from "../models/Project.js";

import mongoose from "mongoose";

const showStatus = async (req, res) => {
  console.log("status projects route called");
  res.status(200).json({ data: "OK" });
};

const createProject = async (req, res) => {
  try {
    const { name, start, end } = req.body;
    if (!name || !start || !end) {
      return res.status(400).json({ error: "Please provide all values" });
    }
    req.body.createdBy = req.user.userId;
    const project = await Project.create(req.body);
    res.status(201).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProject = async (req, res) => {
  console.log("get all project route called");
  return res.status(200).json({ data: "OK" });
};

const updateProject = async (req, res) => {
  const { id: projectId } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "Please provide All Values" });
  }
  try {
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return res.status(404).json({ error: `No project with id ${projectId}` });
    }
    const updateProject = await Project.findOne(
      { _id: projectId },
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ updateProject });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createProject, getAllProject, updateProject, showStatus };
