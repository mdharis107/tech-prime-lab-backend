const { ProjectModel } = require("../models/Project.model");

const addProject = async (req, res) => {
  const {
    ProjectName,
    Reason,
    Type,
    Division,
    Category,
    Priority,
    Department,
    StartDate,
    EndDate,
    Location,
    Status,
  } = req.body;

  const project = new ProjectModel({
    ProjectName,
    Reason,
    Type,
    Division,
    Category,
    Priority,
    Department,
    StartDate,
    EndDate,
    Location,
    Status,
  });

  if (StartDate > EndDate) {
    return res.send({
      msg: "Start Date cannot be greater than End Date",
      err: true,
    });
  }
  try {
    await project.save();
    res.status(201).send({ msg: "New Project created" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Something went wrong" });
  }
};

const getProject = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  //Filter Functionality
  const filterData = req.query.filter
    ? {
        $or: [
          { ProjectName: { $regex: req.query.filter, $options: "i" } },
          { Reason: { $regex: req.query.filter, $options: "i" } },
          { Type: { $regex: req.query.filter, $options: "i" } },
          { Division: { $regex: req.query.filter, $options: "i" } },
          { Category: { $regex: req.query.filter, $options: "i" } },
          { Priority: { $regex: req.query.filter, $options: "i" } },
          { Department: { $regex: req.query.filter, $options: "i" } },
          { Location: { $regex: req.query.filter, $options: "i" } },
          { Status: { $regex: req.query.filter, $options: "i" } },
        ],
      }
    : {};

  // Sorting Functionality
  let sort = req.query.sort || "ProjectName";
  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

  let sortBy = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }

  //Pagination Functionality
  const totalCount = await ProjectModel.countDocuments();
  const projects = await ProjectModel.find({})
    .find(filterData)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit);

  // console.log(totalCount);

  try {
    res.status(200).send({ projects, totalCount });
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "No Data Found" });
  }
};

const countProjects = async (req, res) => {
  const currentDate = new Date();
  //   console.log(currentDate);

  const totalProjects = await ProjectModel.countDocuments();

  const closedProject = await ProjectModel.countDocuments({
    Status: { $eq: "Closed" },
  });

  const runningProject = await ProjectModel.countDocuments({
    Status: { $eq: "Running" },
  });

  const cancelledProject = await ProjectModel.countDocuments({
    Status: { $eq: "Cancelled" },
  });

  const delayProject = await ProjectModel.countDocuments({
    EndDate: { $gt: currentDate },
  });

  const count = [
    totalProjects,
    closedProject,
    runningProject,
    delayProject,
    cancelledProject,
  ];

  const head = [
    "Total Projects",
    "Closed",
    "Running",
    "Closure Delay",
    "Cancelled",
  ];

  const countObj = count.map((ele, index) => {
    return {
      count: ele,
      head: head[index],
    };
  });

  try {
    res.status(200).send(countObj);
  } catch (error) {
    console.log(err);
    res.status(400).send({ msg: "No Data Found" });
  }
};

const chartProject = async (req, res) => {
  const strategy = await ProjectModel.countDocuments({
    Department: { $eq: "Strategy" },
    Status: { $eq: "Closed" },
  });
  const finance = await ProjectModel.countDocuments({
    Department: { $eq: "Finance" },
    Status: { $eq: "Closed" },
  });
  const quality = await ProjectModel.countDocuments({
    Department: { $eq: "Quality" },
    Status: { $eq: "Closed" },
  });

  const maintenance = await ProjectModel.countDocuments({
    Department: { $eq: "Maintenance" },
    Status: { $eq: "Closed" },
  });
  const stores = await ProjectModel.countDocuments({
    Department: { $eq: "Stores" },
    Status: { $eq: "Closed" },
  });
  const HR = await ProjectModel.countDocuments({
    Department: { $eq: "HR" },
    Status: { $eq: "Closed" },
  });

  const totalStrategy = await ProjectModel.countDocuments({
    Department: { $eq: "Strategy" },
  });
  const totalFinance = await ProjectModel.countDocuments({
    Department: { $eq: "Finance" },
  });
  const totalQuality = await ProjectModel.countDocuments({
    Department: { $eq: "Quality" },
  });

  const totalMaintenance = await ProjectModel.countDocuments({
    Department: { $eq: "Maintenance" },
  });
  const totalStores = await ProjectModel.countDocuments({
    Department: { $eq: "Stores" },
  });
  const totalHR = await ProjectModel.countDocuments({
    Department: { $eq: "HR" },
  });

  const closed = [strategy, finance, quality, maintenance, stores, HR];

  const total = [
    totalStrategy,
    totalFinance,
    totalQuality,
    totalMaintenance,
    totalStores,
    totalHR,
  ];

  try {
    res.status(200).send({ closed, total });
  } catch (err) {
    console.log(err);
    res.send({ msg: "No data found" });
  }
};

const updateStatus = async (req, res) => {
  const { Status, id } = req.body;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  //Filter Functionality
  const filterData = req.query.filter
    ? {
        $or: [
          { ProjectName: { $regex: req.query.filter, $options: "i" } },
          { Reason: { $regex: req.query.filter, $options: "i" } },
          { Type: { $regex: req.query.filter, $options: "i" } },
          { Division: { $regex: req.query.filter, $options: "i" } },
          { Category: { $regex: req.query.filter, $options: "i" } },
          { Priority: { $regex: req.query.filter, $options: "i" } },
          { Department: { $regex: req.query.filter, $options: "i" } },
          { Location: { $regex: req.query.filter, $options: "i" } },
          { Status: { $regex: req.query.filter, $options: "i" } },
        ],
      }
    : {};

  // Sorting Functionality
  let sort = req.query.sort || "ProjectName";
  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

  let sortBy = {};
  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }

  await ProjectModel.findByIdAndUpdate(
    id,
    {
      Status,
    },
    {
      new: true,
    }
  );

  const updatedStatus = await ProjectModel.find({})
    .find(filterData)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(limit);

  if (!updatedStatus) {
    res.status(404).send({ msg: "Project Not Found" });
  } else {
    res.status(200).send({ msg: "Status Updated", updatedStatus });
  }
};

module.exports = {
  addProject,
  getProject,
  countProjects,
  chartProject,
  updateStatus,
};
