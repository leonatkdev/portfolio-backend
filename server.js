const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");

// Import the router
const sectionsRouter = require("./routes/sectionRouter");
const authRouter = require("./routes/authRouter.js")

//Middleweare for user
const { adminAuth, userAuth } = require("./middleware/auth.js")

//Connection to db
const connectToDatabase = require("./db.js");

const app = express();
const Port = process.env.PORT || 4001;

const allowedOrigins = ['http://localhost:5173', 'https://leonat.dev'];

// Middleware
app.use(express.json()); // So you can use req.body

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps, curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(cookieParser()); // So we can use res.cookie

// Routes
app.get("/", (req, res) => {
  // res.send("Hello Friend // ");
  const maxAge = 3 * 60 * 60;

  res.send("Hello Friend :)")
  // res.cookie("jwt",  "7a20f602a73fd7e92f3ce9ed196ff68c57f6903d3e9c06f131f5c0a03c12fb86dd2fa1", {
  //   httpOnly: true,
  //   maxAge: maxAge * 1000,
  //   secure: true, // Enable for HTTPS
  // });

});

app.use("/api", sectionsRouter);
app.get("/admin", adminAuth , (req, res) => res.send("Admin Route"))
app.get("/basic" , userAuth , (req, res)=> res.send("User Route") )

app.use("/api/auth" , authRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const server = app.listen(Port, () => {
  console.log(`
    Listening on Port ${Port} 
    Local: ${`http://localhost:${Port}`}`);
});

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Connect to the database
connectToDatabase();
