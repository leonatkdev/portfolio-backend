const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret =
  "7a20f602a73fd7e92f3ce9ed196ff68c57f6903d3e9c06f131f5c0a03c12fb86dd2fa1";

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  if (password?.length < 6) {
    return res.status(400).json({ message: "Password less than 6 charcters" });
  }

  // Old way
  // try {
  //   await User.create({
  //     username,
  //     password,
  //   }).then((user) =>
  //     res.status(200).json({
  //       message: "User Sucsessfully Created",
  //       user,
  //     })
  //   );
  // } catch (err) {
  //   res.status(401).json({
  //     message: "User not Created",
  //     error: err.message,
  //   });
  // }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(200).json({
          message: "User Sucsessfully Created",
          user,
        });
      })
      .catch((err) =>
        res.status(401).json({
          message: "User not Created",
          error: err.message,
        })
      );
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    }

    // Compare passwords using bcrypt
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          { expiresIn: maxAge }
        );

        // Set the cookie before sending the response
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
          secure: process.env.NODE_ENV === 'production', // Enable for HTTPS in production
        });

        // Send the response
        return res.status(200).json({
          message: "Login successful",
          user,
        });
      } else {
        return res.status(400).json({
          message: "Login not successful",
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res
        .status(201)
        .json({
          message: "User deleted",
          user,
        })
        .catch((err) => {
          res.status(400).json({
            message: "User couldn't be deleted",
            error: err.message,
          });
        })
    );
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // First - Verifying if role and id is presnt
  if (role && id) {
    // Second - Verifying if the value of role is admin
    if (role === "admin") {
      // Finds the user with the id
      await User.findById(id)
        .then((user) => {
          // Third - Verifies the user is not an admin
          if (user.role !== "admin") {
            user.role = role;
            user.save((err) => {
              //Monogodb error checker
              if (err) {
                res
                  .status("400")
                  .json({ message: "An error occurred", error: err.message });
                process.exit(1);
              }
              res.status("201").json({ message: "Update successful", user });
            });
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occurred", error: error.message });
        });
    }
  }
};

