const mongoose = require("mongoose")

const { Schema } = mongoose;

const Testimonial = new Schema({
    author: String,
    position: String,
    testimonialText: String
})

const TestimonialsSchema =  new Schema({
    subTitle: String,
    title: String,
    description: String,
    testimonials: [Testimonial]
})
    
const TestimonialsModel = mongoose.model("TestimonialsModel" , TestimonialsSchema )

module.exports = TestimonialsModel;