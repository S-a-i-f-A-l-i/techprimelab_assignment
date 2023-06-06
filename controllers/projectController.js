import Project from "../models/Project.js";

import mongoose from "mongoose";

const showStatus = async (req, res) => {
  let status = await Project.aggregate([
    { $match: { _id: { $exists: true } } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  console.log(status);
  status = status.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(status);
  const defaultStatus = {
    // "registered", "running", "cancelled", "closed"
    cancelled: status.cancelled || 0,
    running: status.running || 0,
    closed: status.closed || 0,
    registered: status.registered || 0,
    // total: this.cancelled + this.running + this.closed + this.registered,
  };
  return res.status(200).json({ defaultStatus });
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
  const queryObject = {};
  const { search } = req.query;
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
    // queryObject.reason = { $regex: search, $options: "i" };
    // queryObject.type = { $regex: search, $options: "i" };
    // queryObject.division = { $regex: search, $options: "i" };
    // queryObject.category = { $regex: search, $options: "i" };
    // queryObject.priority = { $regex: search, $options: "i" };
    // queryObject.department = { $regex: search, $options: "i" };
    // queryObject.location = { $regex: search, $options: "i" };
    // queryObject.status = { $regex: search, $options: "i" };
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  let result = await Project.find(queryObject).skip(skip).limit(limit);
  const projects = await result;
  const totalProjects = await Project.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProjects / limit);
  res.status(200).json({ projects, totalProjects, numOfPages });
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
