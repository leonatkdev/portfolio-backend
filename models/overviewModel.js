const mongoose = require("mongoose")

const { Schema } = mongoose;

const CardSchema = new Schema({
    image: String,
    text: String,
});

const OverviewSchema =  new Schema({
    subTitle: String,
    title: String,
    description: String,
    cards: [CardSchema]  // Define the array of cards using the CardSchema
})

const OverviewModel = mongoose.model("OverviewModel" , OverviewSchema )

module.exports = OverviewModel;