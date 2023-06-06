const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    ProjectName: { type: String, required: true },
    Reason: { type: String, required: true },
    Type: { type: String, required: true },
    Division: { type: String, required: true },
    Category: { type: String, required: true },
    Priority: { type: String, required: true },
    Department: { type: String, required: true },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date, required: true },
    Location: { type: String, required: true },
    Status: { type: String, default: "Registered" },
  },
  {
    timestamps: true,
  }
);

// projectSchema.pre("save", function (next) {
//   if (this.StartDate && this.EndDate && this.StartDate > this.EndDate) {
//     const error = new Error("Start date cannot be greater than end date.");
//     error.status = 400; // Custom status code
//     return next(error);
//   }
//   next();
// });

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = {
  ProjectModel,
};
