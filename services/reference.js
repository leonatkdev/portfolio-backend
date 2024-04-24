const ProductModel = require("../models/productSchema");

console.log(`It's on services calling some function which are for test only`)

/*
Create a new document: To create a new document based on the defined model,
 you can use the create method or create an instance of the model and save it.
*/

// Method 1: Using create
ProductModel.create({
  imageLink: "test",
  productName: "le",
  salesmanName: "le",
  description: "le",
  price: "le",
  location: "le",
  salesmanPhone: "le",
})
  .then((product) => {
    console.log("Created product:", product);
  })
  .catch((error) => {
    console.error("Error creating product:", error);
  });

// Method 2: Creating an instance and saving
const product = new ProductModel({
  imageLink: "test",
  productName: "le",
  salesmanName: "le",
  description: "le",
  price: "le",
  location: "le",
  salesmanPhone: "le",
});

product
  .save()
  .then((product) => {
    console.log("Created product:", product);
  })
  .catch((error) => {
    console.error("Error creating product:", error);
  });

/*
Query documents: You can query the documents in your collection using various methods provided by Mongoose, 
such as find, findOne, or using advanced querying options.
*/

// Find all products
ProductModel.find()
  .then((products) => {
    console.log("Found products:", products);
  })
  .catch((error) => {
    console.error("Error finding products:", error);
  });

// Find a specific product
ProductModel.findOne({ productName: "le" })
  .then((product) => {
    console.log("Found product:", product);
  })
  .catch((error) => {
    console.error("Error finding product:", error);
  });

/*
Update a document: You can update a document using the updateOne, updateMany, or findOneAndUpdate methods.
  */

// Update a specific product
ProductModel.updateOne({ productName: "le" }, { price: "new price" })
  .then((result) => {
    console.log('Update result:', result);
  })
  .catch((error) => {
    console.error('Error updating product:', error);
  });


  /*
  Delete a document: You can delete a document using the deleteOne or deleteMany methods.
  */

// Delete a specific product
ProductModel.deleteOne({ productName: "le" })
  .then((result) => {
    console.log('Deletion result:', result);
  })
  .catch((error) => {
    console.error('Error deleting product:', error);
  });
