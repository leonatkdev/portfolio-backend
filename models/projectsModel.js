const mongoose = require("mongoose")

const { Schema } = mongoose;

const Tech = new Schema({
    technology: String
})

const projectSchema = new Schema({
    link: String,
    image: String,
    projectTitle: String,
    projectDesc: String,
    techs: [Tech]
})

const ProjectsSchema =  new Schema({
    subTitle: String,
    title: String,
    description: String,
    projects: [projectSchema]
})

const ProjectsModel = mongoose.model("ProjectsModel" , ProjectsSchema )

module.exports = ProjectsModel;