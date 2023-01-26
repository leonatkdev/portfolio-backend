import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

const app = express();

await mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true});

if (mongoose.connection.readyState === 1) {
  console.log("Mongoose connection is successful");
} else {
  console.log("Mongoose connection failed");
}

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Create a new user
const newUser = new User({ name: 'John', age: 25 });

// Save the user to the database
newUser.save((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('User saved successfully!');
  }
});

// Find all users
// User.find({}, (err, users) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(users);
//   }
// });

// Update a user
// User.findOneAndUpdate({ name: 'John' }, { age: 30 }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('User updated successfully!');
//   }
// });

// Delete a user
// User.deleteOne({ name: 'John' }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('User deleted successfully!');
//   }
// });


app.get("/", (req, res) => {
  res.send("Hello Friend");
});

app.get('blog/:id', (req, res) => {
   res.send(req.params);
})

app.get("/blogs", (req, res) => {
  res.send("Hello Friend");
});

const PORT = process.env.PORT || 9002;

app.listen(PORT, () => {
  console.log(`Running on ${PORT} port`);
});
