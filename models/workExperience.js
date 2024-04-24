const mongoose = require("mongoose");

const { Schema } = mongoose;

const ResponsibilitieSchema = new Schema({
  title: String,
});

const TimelineSchema = new Schema({
  image: String,
  date: String,
  position: String,
  company: String,
  responsibilities: [ResponsibilitieSchema],
});

const WorkExperienceSchema = new Schema({
  subTitle: String,
  title: String,
  description: String,
  timelines: [TimelineSchema],
});

const WorkExperienceModel = mongoose.model(
  "WorkExperienceModel",
  WorkExperienceSchema
);

module.exports = WorkExperienceModel;
