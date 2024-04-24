const mongoose = require("mongoose");
const ProductModel = require("../models/productSchema");
require("dotenv").config();

//handle initial connection errors
mongoose.connect(process.env.Mongo_DB).
catch(error => {
  console.log('initial connection errors' )
  handleError(error)
});

//handle errors after initial connection
mongoose.connection.on("error", (error) => {
 console.log("Error connecting to MongoDB", error.message);
}); 

console.log('Seeding.js')

async function createSeedData() {
  try {
    const data = [
      {
        imageLink: "test",
        productName: "test",
        salesmanName: "test",
        description: "test",
        price: "test",
        location: "test",
        salesmanPhone: "test",
      },
      {
        imageLink: "test2",
        productName: "test2",
        salesmanName: "test2",
        description: "test2",
        price: "test2",
        location: "test2",
        salesmanPhone: "test2",
      },
    ];

    await ProductModel.create(data);
    console.log("Seed data created successfully");
  } catch (error) {
    console.log("Error creating seed data", error);
  }
}

async function deleteAllDocuments() {
  try {
    await ProductModel.deleteMany();
    console.log("Documents deleted");
  } catch (error) {
    console.log("Error deleting documents:", error);
  } 
}

const command = process.argv[2];

if (command === 'createSeedData') {
  createSeedData();
} else if (command === 'deleteAllDocuments') {
  deleteAllDocuments();
} else {
  console.log('Invalid command');
}


module.exports = {
  createSeedData,
  deleteAllDocuments
};
