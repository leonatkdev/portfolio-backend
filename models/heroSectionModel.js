const mongoose = require("mongoose")

const { Schema } = mongoose;

const HeroSectionSchema =  new Schema({
    subTitle: String,
    title: String,

})

const HeroSectionModel = mongoose.model("HeroSectionModel" , HeroSectionSchema )

module.exports = HeroSectionModel;